package servlets;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.JSONArray;

@ServerEndpoint("/friend_requests")
public class FriendRequests {
	private static String JDBC_DRIVER = "org.gjt.mm.mysql.Driver", DB_URL = "jdbc:mysql://localhost/chat?useSSL=true",
			USER = "root", PASS = "public";

	@OnMessage
	public void onMessage(String msg, Session session) {
		String userName = session.getUserPrincipal().getName().trim();
		userName = userName.substring(0, 1).toUpperCase() + userName.substring(1, userName.length()).toLowerCase();
		Connection conn = null;
		Statement stmt = null;
		try {
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL, USER, PASS);
			stmt = conn.createStatement();
			String user_id = getId(userName);
			String sql = "SELECT user_id_1 FROM user_relation WHERE user_id_2='" + user_id + "' AND relation = 0;";
			ResultSet rs = stmt.executeQuery(sql);
			JSONArray rqsts = new JSONArray();
			while (rs.next()) {
				rqsts.put(getName(rs.getString("user_id_1")));
			}
			session.getBasicRemote().sendText(rqsts.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private String getName(String id) {
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		String name = null;
		try {
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL, USER, PASS);
			stmt = conn.createStatement();
			String sql = "SELECT user_name FROM users WHERE user_id = '" + id + "';";
			rs = stmt.executeQuery(sql);
			rs.next();
			name = rs.getString("user_name");

			name = name.substring(0, 1).toUpperCase() + name.substring(1, name.length()).toLowerCase();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return name;
	}

	private String getId(String name) {
		Connection conn = null;
		Statement stmt = null;
		ResultSet rs = null;
		String id = null;
		try {
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL, USER, PASS);
			stmt = conn.createStatement();
			String sql = "SELECT user_id FROM users WHERE user_name='" + name + "'";
			rs = stmt.executeQuery(sql);
			rs.next();
			id = rs.getString("user_id");
		} catch (Exception e) {
			e.printStackTrace();
		}
		return id;
	}

	@OnError
	public void onError(Throwable e) {
		e.printStackTrace();
	}
}
