package servlets;

import java.io.IOException;
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

import org.json.JSONObject;

@ServerEndpoint("/frnd_request_status")
public class FriendRequestStatus {
	private static HashMap<String, ArrayList<Session>> allUsers = new HashMap<String, ArrayList<Session>>();
	private static String JDBC_DRIVER = "org.gjt.mm.mysql.Driver", DB_URL = "jdbc:mysql://localhost/chat?useSSL=true",
			USER = "root", PASS = "public";

	@OnOpen
	public void onOpen(Session session) throws Exception {
		ArrayList<Session> se = new ArrayList<>();
		String userName = session.getUserPrincipal().getName().trim();
		String userName1 = userName.substring(0, 1).toUpperCase()
				+ userName.substring(1, userName.length()).toLowerCase();
		if (allUsers.containsKey(userName1)) {
			se = allUsers.get(userName1);
		} else {
			se = new ArrayList<>();
		}
		se.add(session);
		allUsers.put(userName1, se);
	}

	@OnMessage
	public void onMessage(String msg, Session session) {
		String userName = session.getUserPrincipal().getName().trim();
		userName = userName.substring(0, 1).toUpperCase() + userName.substring(1, userName.length()).toLowerCase();
		Connection conn = null;
		Statement stmt = null;
		JSONObject obj;
		try {
			obj = new JSONObject(msg);
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL, USER, PASS);
			stmt = conn.createStatement();
			String frndId = getId(obj.getString("name"));
			String userId = getId(userName);

			if (obj.get("status").equals("accepted")) {
				String sql = "UPDATE user_relation SET relation = 1 WHERE user_id_1 = '" + frndId + "' AND user_id_2='"
						+ userId + "';";
				stmt.executeUpdate(sql);
				JSONObject obj2 = new JSONObject();
				obj2.put("status", "friend_accepted");
				obj2.put("name", userName);
				String frndName = obj.getString("name");
				if (allUsers.containsKey(frndName)) {
					for (int r = 0; r < allUsers.get(frndName).size(); r++) {
						try {
							allUsers.get(frndName).get(r).getBasicRemote()
									.sendText(obj2.toString());
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				}
				
				JSONObject obj1 = new JSONObject();
				obj1.put("status", "you_accepted");
				obj1.put("name", obj.getString("name"));
				for (int j = 0; j < allUsers.get(userName).size(); j++) {
					try {
						allUsers.get(userName).get(j).getBasicRemote().sendText(obj1.toString());
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			} else {
				String sql = "DELETE FROM user_relation WHERE user_id_1 = '" + frndId + "' AND user_id_2='" + userId
						+ "';";
				stmt.executeUpdate(sql);
				for (int j = 0; j < allUsers.get(userName).size(); j++) {
					try {
						JSONObject obj1 = new JSONObject();
						obj1.put("status", "you_rejected");
						obj1.put("name", obj.getString("name"));
						allUsers.get(userName).get(j).getBasicRemote().sendText(obj1.toString());
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
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
