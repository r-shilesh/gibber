package servlets;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.JSONException;
import org.json.JSONObject;

import chatServer.ChatHistory;

@ServerEndpoint("/chat")
public class Chat {
	private static HashMap<String, ArrayList<Session>> allUsers = new HashMap<String, ArrayList<Session>>();

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
		session.getBasicRemote().sendText("`"+userName1);
	}

	@OnMessage
	public void onMessage(String msg, Session session) {
		String userName = session.getUserPrincipal().getName().trim();
		userName = userName.substring(0, 1).toUpperCase() + userName.substring(1, userName.length()).toLowerCase();
		String frndName = null;
		if (msg.startsWith("~")) {
			frndName = msg.substring(1);
			if (allUsers.containsKey(frndName)) {
				if (!allUsers.get(frndName).isEmpty()) {
					for (int j = 0; j < allUsers.get(frndName).size(); j++) {
						try {
							allUsers.get(frndName).get(j).getBasicRemote().sendText("~" + userName);
						} catch (IOException e) {
							e.printStackTrace();
						}
					}
				}
			}
		} else {
			JSONObject json;
			try {
				json = new JSONObject(msg);
				frndName = json.getString("friend");
				frndName = frndName.toLowerCase().trim().substring(0, 1).toUpperCase()
						+ frndName.substring(1, frndName.length()).toLowerCase();
				msg = json.getString("message");
			} catch (Exception e1) {
				e1.printStackTrace();
			}
			storeChat(msg, frndName, userName);
			Date date=new Date();
			SimpleDateFormat ft1 = new SimpleDateFormat("dd-MMM-yyyy\n        hh:mm");
			SimpleDateFormat ft2 = new SimpleDateFormat("dd.MM.yyyy");
			JSONObject obj;
			if (allUsers.containsKey(frndName)) {
				if (!allUsers.get(frndName).isEmpty()) {
					 obj = new JSONObject();
					try {
						obj.put("message", msg);
						obj.put("name", userName);
						obj.put("time", ft1.format(date));
						obj.put("date", ft2.format(date));
						obj.put("friend", true);
					} catch (JSONException e1) {
						e1.printStackTrace();
					}
					for (int j = 0; j < allUsers.get(frndName).size(); j++) {
						try {
							allUsers.get(frndName).get(j).getBasicRemote().sendText(obj.toString());
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
			obj = new JSONObject();
			try {
				obj.put("message", msg);
				obj.put("name", frndName);
				obj.put("time", ft1.format(date));
				obj.put("date", ft2.format(date));
				obj.put("friend", false);
			} catch (JSONException e1) {
				e1.printStackTrace();
			}
			for (int j = 0; j < allUsers.get(userName).size(); j++) {
				try {
					allUsers.get(userName).get(j).getBasicRemote().sendText(obj.toString());
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}

	private void storeChat(String msg, String frndName, String userName) {
		try {
			ChatHistory.storeChat(userName, frndName, msg, true, true);
		} catch (Exception e) {
			e.printStackTrace();
		}

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
