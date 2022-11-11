package servlets;

import java.io.DataInputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/RetrievePic")
public class RetrievePic extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public RetrievePic() {
		super();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String file = request.getParameter("file");
		;
		String name = request.getParameter("name");
		name.toLowerCase();
		File f = null;
		if (file.equals("image")) {
			f = new File("/Users/shilu/MyProject/Chat/Photo/" + name + ".png");
		} else {
			f = new File("/Users/shilu/MyProject/Chat/audio/" + name + ".mp3");

		}
		byte[] data = Files.readAllBytes(f.toPath());
		DataInputStream in = new DataInputStream(new java.io.FileInputStream(f));
		in.readFully(data);
		in.close();
		if (file.equals("image")) {
			response.setContentType("image/png");
		}else{
			response.setContentType("audio/mp3");
		}
		ServletOutputStream out = response.getOutputStream();
		out.write(data);
		out.flush();
		out.close();
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}
