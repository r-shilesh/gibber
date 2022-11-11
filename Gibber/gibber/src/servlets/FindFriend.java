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

@ServerEndpoint("/find_friend")
public class FindFriend {
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
	public void onMessage(String frndName, Session session) {
		String userName = session.getUserPrincipal().getName().trim();
		userName = userName.substring(0, 1).toUpperCase() + userName.substring(1, userName.length()).toLowerCase();
		if (!frndName.equals("")) {
			frndName = frndName.toLowerCase().trim().substring(0, 1).toUpperCase()
					+ frndName.substring(1, frndName.length()).toLowerCase();
			if (frndName.equalsIgnoreCase(userName)) {
				try {
					session.getBasicRemote().sendText("You can't send a friend request to yourself.");
				} catch (IOException e) {
					e.printStackTrace();
				}

			} else if (checkFrndIsTrue(frndName)) {
				Connection conn = null;
				Statement stmt = null;
				try {
					Class.forName(JDBC_DRIVER);
					conn = DriverManager.getConnection(DB_URL, USER, PASS);
					stmt = conn.createStatement();
					String frnd_id = getId(frndName), user_id = getId(userName);
					String sql = "SELECT * FROM user_relation WHERE user_id_1='" + user_id + "' OR user_id_2='"
							+ user_id + "';";
					ResultSet rs = stmt.executeQuery(sql);
					boolean isNewFrnd = true;
					int type = -1;
					while (rs.next()) {
						String temp_frnd_id = null;
						if (rs.getString("user_id_1").equals(user_id)) {
							temp_frnd_id = rs.getString("user_id_2");
						} else {
							temp_frnd_id = rs.getString("user_id_1");
						}
						if (temp_frnd_id.equals(frnd_id)) {
							type = rs.getInt("relation");
							isNewFrnd = false;
						}
					}
					if (isNewFrnd) {
						sql = "INSERT INTO user_relation (user_id_1,user_id_2,relation) VALUES ('" + user_id + "','"
								+ frnd_id + "',0);";
						stmt.executeUpdate(sql);
						if (allUsers.containsKey(frndName)) {
							for (int j = 0; j < allUsers.get(frndName).size(); j++) {
								try {
									allUsers.get(frndName).get(j).getBasicRemote()
											.sendText("You recieved a friend request from " + userName);
								} catch (IOException e) {
									e.printStackTrace();
								}
							}
						}
						try {
							session.getBasicRemote().sendText("Friend request successfully sent to " + frndName + ".");
						} catch (IOException e) {
							e.printStackTrace();
						}
					} else {
						String msg;
						if (type == 0) {
							msg = "Friend request is pending from " + frndName + ".";
						} else {
							msg = "You are already a friend with " + frndName + ".";
						}
						try {
							session.getBasicRemote().sendText(msg);
						} catch (IOException e) {
							e.printStackTrace();
						}
					}

				} catch (Exception e) {
					e.printStackTrace();
				}
			} else {
				try {
					session.getBasicRemote().sendText("There is no such person found as " + frndName + ".");
				} catch (IOException e) {
					e.printStackTrace();
				}

			}
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

	private boolean checkFrndIsTrue(String frndName) {

		Connection conn = null;
		Statement stmt = null;
		try {
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL, USER, PASS);
			stmt = conn.createStatement();
			ResultSet rs = null;
			String sql = "Select user_name from users where user_name='" + frndName + "';";
			rs = stmt.executeQuery(sql);
			if (rs.next()) {
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return false;
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
