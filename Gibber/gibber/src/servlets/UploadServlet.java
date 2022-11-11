package servlets;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.ByteBuffer;

import javax.websocket.CloseReason;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/upload")
public class UploadServlet {
	static FileOutputStream fos = null;
	final static String filePath = "/Users/shilu/MyProject/Chat/ProfilePhoto/";

	@OnOpen
	public void open(Session session, EndpointConfig conf) {
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
		if (!msg.startsWith("end")) {
			String fileName = name + ".png";
			File uploadedFile = new File(filePath + fileName);
			try {
				fos = new FileOutputStream(uploadedFile);
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			}
		} else {
			try {
				fos.flush();
				fos.close();
				session.getBasicRemote().sendText("done");
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
