package servlets;

import java.io.File;
import java.io.FilenameFilter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.websocket.OnMessage;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import chatServer.ChatHistory;

@ServerEndpoint("/get_chat_history")
public class RetrieveChatHistory {
	@OnMessage
	public void onMessage(String msg, Session session) {
		String userName = session.getUserPrincipal().getName().trim().toLowerCase();
		String frndName = null;
		JSONObject obj = null;
		try {
			obj = new JSONObject(msg);
			frndName = obj.getString("frndName");
		} catch (JSONException e1) {
			e1.printStackTrace();
		}
		frndName = frndName.trim().toLowerCase();
		try {
			JSONObject json = new JSONObject();
			int num = obj.getInt("num");
			String date = getDate(userName, frndName, num);
			ArrayList<HashMap<String, String>> ch = null;
			if (date != null) {
				json.put("status", "success");
				JSONArray ar = new JSONArray();
				JSONObject tempObj = new JSONObject();
				tempObj.put("date", date);
				ar.put(tempObj);
				ch = new ArrayList<>();
				ch = ChatHistory.search(userName, frndName, date);
				long[] time = new long[ch.size()];
				HashMap<Long, HashMap<String, String>> fi = new HashMap<>();
				for (int i = 0; i < ch.size(); i++) {
					long temp = Long.parseLong(ch.get(i).get("time"));
					fi.put(temp, ch.get(i));
					time[i] = temp;
				}
				time = sort(time);
				ch = new ArrayList<>();
				for (int i = 0; i < time.length; i++) {
					ch.add(fi.get(time[i]));
				}
				for (int i = 0; i < ch.size(); i++) {
					tempObj = new JSONObject();
					tempObj.put("date", "");
					tempObj.put("who", ch.get(i).get("who"));
					tempObj.put("time", ch.get(i).get("time1"));
					if (ch.get(i).containsKey("me")) {
						tempObj.put("me", ch.get(i).get("me"));
					} else {
						tempObj.put("friend", ch.get(i).get("friend"));
					}
					ar.put(tempObj);
				}
				json.put("message", ar);
			}
			session.getBasicRemote().sendText(json.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static String getDate(String userName, String frndName, int num) {
		File file = new File("/Users/shilu/MyProject/Chat/ChatHistory/" + userName + "/" + frndName);
		String[] dates = file.list(new FilenameFilter() {
			@Override
			public boolean accept(File current, String name) {
				return new File(current, name).isDirectory();
			}
		});
		List<Date> ls = new ArrayList<>();
		Date date = null;
		for (int i = 0; i < dates.length; i++) {
			try {
				date = new SimpleDateFormat("dd.MM.yyyy").parse(dates[i]);
			} catch (ParseException e) {
				e.printStackTrace();
			}
			ls.add(date);
		}
		if (ls.size() <= num) {
			return null;
		}
		Collections.sort(ls, Collections.reverseOrder());
		SimpleDateFormat ft = new SimpleDateFormat("dd.MM.yyyy");
		String ar= ft.format(ls.get(num));;
		return ar;
	}

	private static long[] sort(long[] array) {
		int num = array.length, i, j;
		long temp;
		for (i = 0; i < (num - 1); i++) {
			for (j = 0; j < num - i - 1; j++) {
				if (array[j] > array[j + 1]) {
					temp = array[j];
					array[j] = array[j + 1];
					array[j + 1] = temp;
				}
			}
		}
		return array;
	}
}
