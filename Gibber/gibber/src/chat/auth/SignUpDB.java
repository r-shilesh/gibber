package chat.auth;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.UUID;

public class SignUpDB {
	public static String createUser(String user, String pass) {
		String JDBC_DRIVER = "com.mysql.jdbc.Driver", DB_URL = "jdbc:mysql://localhost/chat?useSSL=true", USER = "root",
				PASS = "public";
		Connection conn = null;
		Statement stmt = null;
		user = user.toLowerCase().trim();
		try {
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL, USER, PASS);
			stmt = conn.createStatement();
			if (!pass.equals("")) {
				try {
					UUID uid = UUID.randomUUID();
//					pass = encrypt(pass);
					String sql = "INSERT INTO users(user_id,user_name,password)VALUES('" + uid.toString() + "','" + user
							+ "','" + pass + "')";
					stmt.executeUpdate(sql);
				} catch (SQLException se) {
					se.printStackTrace();
					return "User name is not vacant!";
				}
			} else {
				ResultSet rs = null;
				try {
					String sql = "SELECT * FROM users WHERE user_name=\"" + user + "\"";
					rs = stmt.executeQuery(sql);
					if (rs.next()) {
						return "not";
					}
				} catch (Exception r) {
					r.printStackTrace();
				} finally {
					rs.close();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				stmt.close();
				conn.close();
			} catch (Exception e) {

			}
		}
		return "Created";
	}

//	private final static String salt = "DGE$5SGr@3VsHYUMas2323E4d57vfBfFSTRU@!DSH(*%FDSdfg13sgfsg";
//
//	public static String encrypt(String message) {
//		String md5 = "";
//		if (null == message){
//			return null;
//		}
//		message = message + salt;
//		try {
//			MessageDigest digest = MessageDigest.getInstance("MD5");
//			digest.update(message.getBytes(), 0, message.length());
//			md5 = new BigInteger(1, digest.digest()).toString(16);
//		} catch (NoSuchAlgorithmException e) {
//			e.printStackTrace();
//		}
//		return md5;
//	}
}
