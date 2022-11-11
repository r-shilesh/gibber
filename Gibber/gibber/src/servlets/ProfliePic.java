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

@WebServlet("/ProfliePic")
public class ProfliePic extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public ProfliePic() {
        super();
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String name=request.getParameter("name");
		name.toLowerCase();
		File f = new File("/Users/shilu/MyProject/Chat/ProfilePhoto/" + name);
		if(!f.exists()){
			f = new File("/Users/shilu/MyProject/Chat/ProfilePhoto/Profile-None.png");
		}
		byte[] data = Files.readAllBytes(f.toPath());			
		DataInputStream in = new DataInputStream(new java.io.FileInputStream(f));
		in.readFully(data);
		in.close();
		response.setContentType("image/png");
		ServletOutputStream out = response.getOutputStream();
		out.write(data);
		out.flush();
		out.close();
	}
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
