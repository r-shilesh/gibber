package servlets;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.UUID;

import javax.websocket.CloseReason;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import chatServer.ChatHistory;

@ServerEndpoint("/photo_upload")
public class PhotoUpload {
	static FileOutputStream fos = null;
	final static String filePath = "/Users/shilu/MyProject/Chat/Photo/";

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
	}

	@OnMessage
	public void processUpload(ByteBuffer msg, boolean last, Session session) {
		while (msg.hasRemaining()) {
			try {
				fos.write(msg.get());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	@OnMessage
	public void message(Session session, String msg) {
		String name = session.getUserPrincipal().getName().toLowerCase();
		if (!msg.equals("end")) {
			UUID id = UUID.randomUUID();
			String uid = id.toString();
			String fileName = "/" + uid + ".png";
			File uploadedFile = new File(filePath + fileName);
			try {
				uploadedFile.createNewFile();
				fos = new FileOutputStream(uploadedFile);
			} catch (Exception e) {
				e.printStackTrace();
			}
			String frn = msg;
			frn = frn.substring(0, 1).toUpperCase() + frn.substring(1, frn.length()).toLowerCase();
			try {
				ChatHistory.storeChat(name, frn, "«" + uid, true, true);
				Calendar cal = Calendar.getInstance();
				int date = cal.get(Calendar.DATE), mon = cal.get(Calendar.MONTH), year = cal.get(Calendar.YEAR),
						hour = cal.get(Calendar.HOUR), min = cal.get(Calendar.MINUTE);
				String time = date + "/" + mon + "/" + (year % 100) + ", " + hour + ":" + min;
				session.getBasicRemote().sendText(uid + "∑" + time);
				if (allUsers.containsKey(frn)) {
					if (!allUsers.get(frn).isEmpty()) {
						for (int j = 0; j < allUsers.get(frn).size(); j++) {
							try {
								allUsers.get(frn).get(j).getBasicRemote().sendText("∑"+name + "∑" + uid + "∑" + time);
							} catch (IOException e) {
								e.printStackTrace();
							}
						}
					}
				}
			} catch (Exception e1) {
				e1.printStackTrace();
			}
		} else {
			try {
				fos.flush();
				fos.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

	}

	@OnClose
	public void close(Session session, CloseReason reason) {
	}

	@OnError
	public void error(Session session, Throwable t) {
		t.printStackTrace();

	}
}
