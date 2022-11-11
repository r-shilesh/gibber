package servlets;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.JSONArray;
import org.json.JSONObject;

@ServerEndpoint("/chat_frnds")
public class ChatFriends {
	private static HashMap<String, ArrayList<Session>> allUsers = new HashMap<String, ArrayList<Session>>();
	private static String JDBC_DRIVER = "org.gjt.mm.mysql.Driver", DB_URL = "jdbc:mysql://localhost/chat?useSSL=true",
			USER = "root", PASS = "public";

	@OnOpen
	public void onOpen(Session session) throws Exception {
		onMessage("", session);
	}

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
			String userId = getId(userName);
			String sql = "SELECT * FROM user_relation WHERE user_id_2='" + userId + "' AND relation = 0;";
			ResultSet rs = stmt.executeQuery(sql);
			JSONArray ar = new JSONArray();
			if (!rs.next()) {
				ar.put(false);
			} else {
				ar.put(true);
			}
			sql = "SELECT * FROM user_relation WHERE ( user_id_1='" + userId + "' OR user_id_2='" + userId
					+ "' ) AND relation = 1;";
			rs = stmt.executeQuery(sql);
			while (rs.next()) {
				String user_id_1 = rs.getString("user_id_1"), user_id_2 = rs.getString("user_id_2"),
						lastMessage = rs.getString("last_message"), who = rs.getString("who");
				JSONObject ob = new JSONObject();
				if (user_id_1.equals(userId)) {
					ob.put("name", getName(user_id_2));
					if (who.equals("1")) {
						ob.put("lastMsg", "You : " + lastMessage);
					} else {
						ob.put("lastMsg", lastMessage);
					}
				} else {
					ob.put("name", getName(user_id_1));
					if (who.equals("2")) {
						ob.put("lastMsg", "You : " + lastMessage);
					} else {
						ob.put("lastMsg", lastMessage);
					}
				}
				ar.put(ob);
			}
			session.getBasicRemote().sendText(ar.toString());
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

	@OnClose
	public void onClose(Session session) {
		String userName = session.getUserPrincipal().getName().trim();
		String userName1 = userName.substring(0, 1).toUpperCase()
				+ userName.substring(1, userName.length()).toLowerCase();
		for (int j = 0; j < allUsers.get(userName1).size(); j++) {
			if (session.toString().equals(allUsers.get(userName1).get(j).toString())) {
				allUsers.get(userName1).remove(j);
			}
		}
	}

	@OnError
	public void onError(Throwable e) {
		e.printStackTrace();
	}
}
