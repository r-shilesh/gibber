package chatServer;

import java.io.File;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

import org.apache.lucene.analysis.standard.ClassicAnalyzer;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StringField;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.index.IndexableField;
import org.apache.lucene.index.Term;
import org.apache.lucene.search.BooleanClause;
import org.apache.lucene.search.BooleanQuery;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.search.WildcardQuery;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.NIOFSDirectory;

public class ChatHistory {

	public static ArrayList<HashMap<String, String>> search(String user_name, String to_name, String date)
			throws Exception {
		IndexSearcher is;
		Path path = Paths.get("/Users/shilu/MyProject/Chat/ChatHistory/" + user_name + "/" + to_name + "/" + date);
		Directory index = new NIOFSDirectory(path);
		IndexReader reader = DirectoryReader.open(index);
		is = new IndexSearcher(reader);
		BooleanQuery.Builder booleanQuery = new BooleanQuery.Builder();
		Query tempquery;
		tempquery = new WildcardQuery(new Term("who", "*"));
		booleanQuery.add(tempquery, BooleanClause.Occur.MUST);
		TopDocs docs = is.search(booleanQuery.build(), 100);
		ScoreDoc[] hits = docs.scoreDocs;
		ArrayList<HashMap<String, String>> ret = new ArrayList<>();
		for (int i = 0; i < hits.length; ++i) {
			int docId = hits[i].doc;
			Document d = is.doc(docId);
			HashMap<String, String> temp = new HashMap<>();
			ret.add(temp);
			for (IndexableField ds : d.getFields()) {
				temp.put(ds.name(), ds.stringValue());
			}
		}
		return ret;
	}

	private static String JDBC_DRIVER = "org.gjt.mm.mysql.Driver", DB_URL = "jdbc:mysql://localhost/chat?useSSL=true",
			USER = "root", PASS = "public";

	public static void storeChat(String user_name, String to_name, String value, boolean me, boolean s)
			throws Exception {
		Connection conn = null;
		Statement stmt = null;
		try {
			Class.forName(JDBC_DRIVER);
			conn = DriverManager.getConnection(DB_URL, USER, PASS);
			stmt = conn.createStatement();
			String temp = value;
			if(temp.startsWith("˚")){
				temp = "Sent an audio file.";
			}else if(temp.startsWith("«")){
				temp = "Sent an image.";
			}else if (value.length() > 20) {
				temp = value.substring(0, 20) + "...";
			}
			if (me) {
				String sql = "SELECT user_id_1 FROM user_relation WHERE (user_id_1 = '" + getId(user_name)
						+ "' AND user_id_2 = '" + getId(to_name) + "') OR (user_id_2 = '" + getId(user_name)
						+ "' AND user_id_1 = '" + getId(to_name) + "');";
				ResultSet rs = stmt.executeQuery(sql);
				rs.next();
				boolean who = false;
				if (rs.getString("user_id_1").equals(getId(user_name))) {
					who = true;
				}
				String who1 = "2";
				if (who) {
					who1 = "1";
				}
				sql = "UPDATE user_relation SET last_message = '" + temp + "', who = " + who1 + " WHERE (user_id_1 = '"
						+ getId(user_name) + "' AND user_id_2 = '" + getId(to_name) + "') OR (user_id_2 = '"
						+ getId(user_name) + "' AND user_id_1 = '" + getId(to_name) + "');";
				stmt.executeUpdate(sql);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		user_name = user_name.toLowerCase();
		to_name = to_name.toLowerCase();
		IndexWriter w = null;
		try {
			ClassicAnalyzer analyzer = new ClassicAnalyzer();
			SimpleDateFormat ft = new SimpleDateFormat("dd.MM.yyyy");
			Date date = new Date();
			new File("/Users/shilu/MyProject/Chat/ChatHistory/" + user_name + "/" + to_name + "/" + ft.format(date))
					.mkdirs();
			Path path = Paths.get(
					"/Users/shilu/MyProject/Chat/ChatHistory/" + user_name + "/" + to_name + "/" + ft.format(date));
			Directory index = new NIOFSDirectory(path);
			IndexWriterConfig config = new IndexWriterConfig(analyzer);
			w = new IndexWriter(index, config);
			Document doc = new Document();
			ft = new SimpleDateFormat("dd-MMM-yyyy\n        hh:mm");
			doc.add(new StringField("time", date.getTime() + "", Field.Store.YES));
			doc.add(new StringField("time1", ft.format(date), Field.Store.YES));
			if (me) {
				doc.add(new StringField("me", value, Field.Store.YES));
				doc.add(new StringField("who", "me", Field.Store.YES));
			} else {
				doc.add(new StringField("friend", value, Field.Store.YES));
				doc.add(new StringField("who", "friend", Field.Store.YES));
			}
			w.addDocument(doc);
			if (s) {
				w.close();
				storeChat(to_name, user_name, value.trim(), false, false);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			w.close();
		}
	}

	private static String getId(String name) {
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
}
