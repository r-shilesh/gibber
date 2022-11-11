<!DOCTYPE html>
<html>
<style>
#al {
	vertical-align: middle;
	width: 300px;
	height: 300px;
	border-radius: 20px;
	background-color: black;
	position: absolute;
	top: 150px;
	left: 37.5%;
	box-shadow: 10px 10px 14px #888888;
}

h1 {
	color: white;
}

#al1 {
	position: relative;
	top: 15px;
	left: 10%;
}

#use {
	width: 219px;
	font-size: 16px;
	padding-right: 10px;
	height: 30px;
	padding-left: 10px;
	outline: none;
	border-radius: 5px;
	border: 0px;
	position: absolute;
	left: 0px;
}

#pas {
	width: 219px;
	font-size: 16px;
	border-radius: 5px;
	border: 0px;
	outline: none;
	padding-right: 10px;
	height: 30px;
	padding-left: 10px;
	position: absolute;
	left: 0px;
}

#conpas {
	width: 219px;
	font-size: 16px;
	border-radius: 5px;
	border: 0px;
	outline: none;
	padding-right: 10px;
	height: 30px;
	padding-left: 10px;
	position: absolute;
	left: 0px;
}

#sub {
	border-radius: 5px;
	width: 100px;
	height: 30px;
	border: 0px;
	background-color: #D0D0D0;
	cursor: pointer;
	outline: none;
	position: relative;
	left: 23.5%;
}

* {
	font-family: myfont;
	outline: none;
}

@font-face {
	font-family: myfont;
	src: url("/Gibber/font/Thin.ttf");
	font-size: 100px;
}

#usr {
	color: red;
	text-align: center;
	padding-left: 10px;
	padding-right: 10px;
	color: white;
	border-radius: 5px;
	background-color: grey;
}

::-moz-selection {
	color: none;
	background: #d9d9d9;
}

::selection {
	color: none;
	background: #d9d9d9;
}

#signup {
	border-radius: 5px;
	border: 0px;
	height: 40px;
	background-color: #F0F0F0;
	position: absolute;
	width: 100px;
	border: 1px solid;
	border-color: grey;
	top: 10px;
	right: 20px;
	color: #686868;
}

#signup:hover {
	border: 0px solid;
	box-shadow: 4px 4px 8px #888888;
	border: 1px solid;
	color: black;
	background-color: none;
	border-color: #B0B0B0;
}

h1 {
	position: absolute;
	left: 23%;
}

body::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
	background-color: #F5F5F5;
}

body::-webkit-scrollbar {
	width: 10px;
	background-color: #F5F5F5;
}

body::-webkit-scrollbar-thumb {
	background-color: #000000;
	border: 1px solid #555555;
}

#goo {
	width: 10px;
	height: 10px;
	background-color: green;
	border-radius: 10px;
	position: absolute;
	top: 105px;
	right: 45px;
}

#err {
	width: 10px;
	height: 10px;
	background-color: red;
	border-radius: 10px;
	position: absolute;
	top: 105px;
	right: 45px;
}

#tit {
	position: absolute;
	top: 15px;
	left: 41%;
}
#icon {
	width:200px;
}
</style>
<head>
<title>Sign In - Gibber</title>
<link rel="icon" id="favicon" href="/Gibber/images/icon.png?v=2">
</head>
<link rel="stylesheet"
	href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/jquery-1.10.2.js"></script>
<script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
<%
	String fail = request.getParameter("retry");
%>
<script>
	$(document)
			.ready(
					function() {
						var ti = 50;
						var pos1 = 50.5;
						var pos2 = 8.5;
						var fi = 31.5;
						if (
<%=fail%>
	!= null) {
							$("#al1").animate({
								position : 'absolute',
								left : pos1
							}, ti);
							$("#al1").animate({
								position : 'absolute',
								left : pos2
							}, ti);
							$("#al1").animate({
								position : 'absolute',
								left : pos1
							}, ti);
							$("#al1").animate({
								position : 'absolute',
								left : pos2
							}, ti);
							$("#al1").animate({
								position : 'absolute',
								left : pos1
							}, ti);
							$("#al1").animate({
								position : 'absolute',
								left : pos2
							}, ti);
							$("#al1").animate({
								position : 'absolute',
								left : fi
							}, ti);
						}
						;
						$("#con").hide();
						$("#conpas").hide();
						$("#signup")
								.click(
										function() {
											var v = $("#con").val();
											if (v === "false") {
												$("#signup").html(
														"<b>Sign In</b>");
												$("#con").val("true");
												$("h1").html("<b>Sign Up</b>");
												$("h1").animate({
													position : "absolute",
													left : "62"
												}, 300);
												$("#conpas").slideDown(300);
												$("#sub").html("<b>Sign Up<b>");
												$("#al").animate({
													height : "350"
												}, 300);
												$("#sub").animate({
													position : "absolute",
													top : "55"
												}, {
													queue : false
												}, 300);
												$("#sub").fadeOut(300);
												$("#use").focus();
												document.title = 'Sign Up - Gibber';
												$('#favicon').remove();
												$('head')
														.append(
																'<link href="/Gibber/signup.png?v=2" id="favicon" rel="shortcut icon">');
											} else {
												document.title = 'Sign In - Gibber';
												$("#signup").html(
														"<b>Sign Up</b>");
												$("#con").val("false");
												$("h1").html("<b>Sign In</b>");
												$("h1").animate({
													position : "absolute",
													left : "69"
												}, 300);
												$("#conpas").slideUp(300);
												$("#sub").html("<b>Sign In<b>");
												$("#al").animate({
													height : "300"
												}, 300);
												$("#sub").animate({
													position : "absolute",
													top : "0"
												}, {
													queue : false
												}, 300);
												$("#sub").fadeIn(300);
												$("#use").focus();
												$('#favicon').remove();
											}
										});
						$("#goo").hide();
						$("#err").hide();
						$("#use").focusout(function() {
							var v = $("#con").val();
							if ($("#use").val() === "") {
								$("#goo").fadeOut(200);
								$("#err").fadeOut(200);
								$("#sub").fadeIn(300);
							}
							if (v === "true" && $("#use").val() !== "") {
								$.post("/Gibber/signup", {
									userName : $("#use").val(),
									userPass : ""
								}, function(data1, status) {
									if (data1.indexOf("no") > -1) {
										$("#goo").fadeOut(200);
										$("#err").fadeIn(200);
										$("#sub").fadeOut(300);
									} else {
										$("#err").fadeOut(200);
										$("#goo").fadeIn(200);
										$("#sub").fadeIn(300);
									}
								});
							}
						});
						$('#myForm').submit(
								function() {
									var v = $("#con").val();
									var use = $("#use").val();
									var pas = $("#pas").val();
									var pas1 = $("#conpas").val();
									var ti = 100;
									var pos1 = 25;
									var pos2 = -25;
									var fi = 0;
									if (v === "true") {
										var count = 0;
										if (use === "") {
											$("#use").animate({
												position : 'absolute',
												left : pos1
											}, ti);
											$("#use").animate({
												position : 'absolute',
												left : pos2
											}, ti);
											$("#use").animate({
												position : 'absolute',
												left : pos1
											}, ti);
											$("#use").animate({
												position : 'absolute',
												left : pos2
											}, ti);
											$("#use").animate({
												position : 'absolute',
												left : pos1
											}, ti);
											$("#use").animate({
												position : 'absolute',
												left : pos2
											}, ti);
											$("#use").animate({
												position : 'absolute',
												left : fi
											}, ti);
											count++;
										}
										if (pas === "") {
											$("#pas").animate({
												position : 'absolute',
												left : pos1
											}, ti);
											$("#pas").animate({
												position : 'absolute',
												left : pos2
											}, ti);
											$("#pas").animate({
												position : 'absolute',
												left : pos1
											}, ti);
											$("#pas").animate({
												position : 'absolute',
												left : pos2
											}, ti);
											$("#pas").animate({
												position : 'absolute',
												left : pos1
											}, ti);
											$("#pas").animate({
												position : 'absolute',
												left : pos2
											}, ti);
											$("#pas").animate({
												position : 'absolute',
												left : fi
											}, ti);
											count++;
										}
										if (pas1 === "") {
											$("#conpas").animate({
												position : 'absolute',
												left : pos1
											}, ti);
											$("#conpas").animate({
												position : 'absolute',
												left : pos2
											}, ti);
											$("#conpas").animate({
												position : 'absolute',
												left : pos1
											}, ti);
											$("#conpas").animate({
												position : 'absolute',
												left : pos2
											}, ti);
											$("#conpas").animate({
												position : 'absolute',
												left : pos1
											}, ti);
											$("#conpas").animate({
												position : 'absolute',
												left : pos2
											}, ti);
											$("#conpas").animate({
												position : 'absolute',
												left : fi
											}, ti);
											count++;
										}
										if ((pas != pas1 && count == 0)
												|| (pas === use)) {
											$("#pas").animate({
												position : 'absolute',
												left : pos1
											}, ti);
											$("#conpas").animate({
												position : 'absolute',
												left : pos1
											}, ti);
											$("#pas").animate({
												position : 'absolute',
												left : pos2
											}, ti);
											$("#conpas").animate({
												position : 'absolute',
												left : pos2
											}, ti);
											$("#pas").animate({
												position : 'absolute',
												left : pos1
											}, ti);
											$("#conpas").animate({
												position : 'absolute',
												left : pos1
											}, ti);
											$("#pas").animate({
												position : 'absolute',
												left : pos2
											}, ti);
											$("#conpas").animate({
												position : 'absolute',
												left : pos2
											}, ti);
											$("#pas").animate({
												position : 'absolute',
												left : pos1
											}, ti);
											$("#conpas").animate({
												position : 'absolute',
												left : pos1
											}, ti);
											$("#pas").animate({
												position : 'absolute',
												left : pos2
											}, ti);
											$("#conpas").animate({
												position : 'absolute',
												left : pos2
											}, ti);
											$("#pas").animate({
												position : 'absolute',
												left : fi
											}, ti);
											$("#conpas").animate({
												position : 'absolute',
												left : fi
											}, ti);
											$("#pas").val("");
											$("#conpas").val("");
											count++;
										}

										if (count == 0) {
											$("#use").val(
													$("#use").val()
															.toLowerCase());
											$.post("/Gibber/signup", {
												userName : use,
												userPass : $("#pas").val()
											}, function(data1, status) {
												return true;
											});
										} else {
											return false;
										}
									}
								});
					});
</script>
<body bgcolor="#e6e6e6">
	<div id="tit">
		<img id="icon" alt="i" src="/Gibber/images/GibberDark.png">
	</div>
	<div id="al">
		<div id="al1">
			<div id="mo">
				<h1>Sign In</h1>
				<br> <br> <br> <br>
				<form method="POST" id="myForm" action="j_security_check">
					<br>
					<div id="input">
						<abbr title="Username is occupied.">
							<div id="err"></div>
						</abbr> <abbr title="Good choice">
							<div id="goo"></div>
						</abbr> <input onClick="this.select();" id="use" type="text"
							name="j_username" placeholder="User Name" autofocus
							spellcheck="false"> <br> <br> <br> <input
							onClick="this.select();" id="pas" type="password"
							placeholder="Password" name="j_password"> <br> <br>
						<br> <input onClick="this.select();" id="conpas"
							type="password" placeholder="Confirm Password" name="conpass">
					</div>
					<button id="sub" type="Submit">
						<b>Sign In</b>
					</button>
				</form>
				<input type="text" id="con" value="false">

			</div>
		</div>
	</div>
	<button id="signup" type="button">
		<b>Sign Up</b>
	</button>
</body>
</html>
