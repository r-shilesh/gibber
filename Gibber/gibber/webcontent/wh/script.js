$(document).ready(function() {
	main();
	design();
	$("#chat").scroll(function() {
		scrolledTop();
	});
});
var friend = null;
var lastGrp = null;
var GroupIn = null;
var num;
var frndclck = false;
var grpclck = false;

function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function(e) {
			$('#prof').attr('src', e.target.result).width(200).height(200);
		};

		reader.readAsDataURL(input.files[0]);
	}
}

function clickFriend(name) {
	if (friend !== name) {
		$('#group').hide();
		$('#chat').show();
		$('#chat').unbind("scroll");
		frndclck = true;
		GroupIn = false;
		friend = name;
		$('#chat').html("");
		$("#alert_chat").fadeOut(100);
		num = 0;
		var obj = {};
		obj["num"] = num;
		obj["frndName"] = name;
		var json = JSON.stringify(obj);
		msgId = 0;
		lastMsg = "None";
		$('#composer').fadeIn(100);
		$('#message').focus();
		$('#top').html("<div id='frndName'>" + name + "</div>");
		$('#top').css('box-shadow', '0px 0px 200px #4f4f4f');
		chatHistory.send(json);
	}
}

function clickGroup(id) {
	if (lastGrp !== id) {
		$('#chat').hide();
		$('#group').show();
		$('#group').unbind("scroll");
		grpclck = true;
		GroupIn = true;
		lastGrp = id;
		$('#group').html("");
		$("#alert_grp").fadeOut(100);
		num = 0;
		var obj = {};
		obj["num"] = num;
		obj["groupId"] = id;
		var json = JSON.stringify(obj);
		/** *************************** */
		msgId = 0;
		lastMsg = "None";
		$('#composer').fadeIn(100);
		$('#message').focus();
		$('#top').html("<div id='frndName'>" + id + "</div>");
		$('#top').css('box-shadow', '0px 0px 200px #4f4f4f');
		goupChatHistory(json);
	}
}

function goupChatHistory(json) {
	var id = $.parseJSON(json).groupId;
	$
			.post(
					"/Gibber/get_group_chat_history",
					{
						obj : json
					},
					function(data, status) {
						lastMsg = "None";
						var obj = $.parseJSON(data);
						var mesg = obj.message;
						var i;
						var objDiv = document.getElementById("group");
						var bfrHeight = objDiv.scrollHeight;
						if (data !== "{}" && mesg != undefined) {
							for (i = (mesg.length - 1); i > 0; i--) {
								msgId++;
								if (mesg[i].name.toLowerCase() === userName
										.toLowerCase()) {

									var msg1 = mesg[i].msg;
									if (msg1.startsWith("˚")) {
										msg1 = "<audio controls><source src='/Gibber/RetrievePic?name="
												+ msg1.substring(1)
												+ "&file=audio'>";

										$("#group")
												.prepend(
														"<abbr title='"
																+ mesg[i].time
																+ "'><div class='me1' id='"
																+ msgId
																+ "'>"
																+ msg1
																+ "</div></abbr>");
									} else if (msg1.startsWith("«")) {
										msg1 = "<img class='imgMsg' src='/Gibber/RetrievePic?name="
												+ msg1.substring(1)
												+ "&file=image'>";

										$("#group")
												.prepend(
														"<abbr title='"
																+ mesg[i].time
																+ "'><div class='me1' id='"
																+ msgId
																+ "'>"
																+ msg1
																+ "</div></abbr>");
									} else {
										var chk = true;
										if (msg1 === "😮" || msg1 === "😯") {
											msg1 = "<img class='me_emoji' src='emoji/13.gif'>";
											chk = false;
										} else if (msg1 === "🙂") {
											msg1 = "<img class='me_emoji' src='emoji/1.gif'>";
											chk = false;
										} else if (msg1 === "😍") {
											msg1 = "<img class='me_emoji' src='emoji/2.gif'>";
											chk = false;
										} else if (msg1 === "😜") {
											msg1 = "<img class='me_emoji' src='emoji/3.gif'>";
											chk = false;
										} else if (msg1 === "❤️") {
											msg1 = "<img class='me_emoji' src='emoji/4.gif'>";
											chk = false;
										} else if (msg1 === "😝️") {
											msg1 = "<img class='me_emoji' src='emoji/5.gif'>";
											chk = false;
										} else if (msg1 === "😐️") {
											msg1 = "<img class='me_emoji' src='emoji/6.gif'>";
											chk = false;
										} else if (msg1 === "😉") {
											msg1 = "<img class='me_emoji' src='emoji/7.gif'>";
											chk = false;
										} else if (msg1 === "👋") {
											msg1 = "<img class='me_emoji' src='emoji/8.gif'>";
											chk = false;
										} else if (msg1 === "💔") {
											msg1 = "<img class='me_emoji' src='emoji/9.gif'>";
											chk = false;
										} else if (msg1 === "🤤") {
											msg1 = "<img class='me_emoji' src='emoji/10.gif'>";
											chk = false;
										} else if (msg1 === "🙁") {
											msg1 = "<img class='me_emoji' src='emoji/11.gif'>";
											chk = false;
										} else if (msg1 === "😥") {
											msg1 = "<img class='me_emoji' src='emoji/12.gif'>";
											chk = false;
										} else if (msg1 === "😨") {
											msg1 = "<img class='me_emoji' src='emoji/14.gif'>";
											chk = false;
										} else if (msg1 === "😏") {
											msg1 = "<img class='me_emoji' src='emoji/15.gif'>";
											chk = false;
										} else if (msg1 === "😡") {
											msg1 = "<img class='me_emoji' src='emoji/16.gif'>";
											chk = false;
										} else if (msg1 === "😕") {
											msg1 = "<img class='me_emoji' src='emoji/17.gif'>";
											chk = false;
										} else if (msg1 === "😎") {
											msg1 = "<img class='me_emoji' src='emoji/18.gif'>";
											chk = false;
										} else if (msg1 === "💓") {
											msg1 = "<img class='me_emoji' src='emoji/19.gif'>";
											chk = false;
										}
										if (chk) {

											msg1 = msg1.replace("<",
													"<span><</span>");
											msg1 = $.trim(msg1);
											msg1 = msg1.replace("\n", "<br>");
											var sp = msg1.split(" ");
											var k;
											var v = null;
											var link = true;
											msg1 = "";
											for (k = 0; k < sp.length; k++) {
												var urlRE = new RegExp(
														"([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+");
												var check = sp[k].match(urlRE);
												if (check !== null) {
													link = false;
													msg1 += " <a href='"
															+ check[0]
															+ "' target='_blank'>"
															+ check[3]
															+ "</a> ";
													if (check[3]
															.includes(".youtube.")) {
														v = getAllUrlParams(check[0]).v;
													}
												} else {
													msg1 += sp[k] + " ";
												}
											}
											if (link) {
												if (msg1.includes("*")) {
													msg1 = msgSplit("*",
															"strike", msg1);
												}
												if (msg1.includes("_")) {
													msg1 = msgSplit("_", "i",
															msg1);
												}
												if (msg1.includes("-")) {
													msg1 = msgSplit("-", "b",
															msg1);
												}
											}
											if (v != null) {
												msgId++;
												$("#group")
														.prepend(
																"<abbr title='"
																		+ mesg[i].time
																		+ "'><div class='me1' id='"
																		+ msgId
																		+ "'><iframe width=\"480\" height=\"300\" "
																		+ "src=\"https://www.youtube.com/embed/"
																		+ v
																		+ "\"></iframe></div></abbr>");
												$("#" + (msgId - 1))
														.css(
																"border-bottom-right-radius",
																"5px");
											}
											$("#group")
													.prepend(
															"<abbr title='"
																	+ mesg[i].time
																	+ "'><div class='me1' id='"
																	+ msgId
																	+ "'>"
																	+ msg1
																	+ "</div></abbr>");
										} else {
											$("#group")
													.prepend(
															"<abbr title='"
																	+ mesg[i].time
																	+ "'><div class='me1_emo' id='"
																	+ msgId
																	+ "'>"
																	+ msg1
																	+ "</div></abbr>");
										}
									}
									if (lastMsg === "frnd") {
										if (mesg[i - 1].name.toLowerCase() === userName
												.toLowerCase()) {
											$("#" + (msgId)).css(
													"border-top-right-radius",
													"5px");
											$("#" + (msgId))
													.css(
															"border-bottom-right-radius",
															"20px");
										} else {
											$("#" + (msgId)).css(
													"border-top-right-radius",
													"20px");
											$("#" + (msgId))
													.css(
															"border-bottom-right-radius",
															"5px");
										}

									} else {
										$("#" + (msgId)).css(
												"border-top-right-radius",
												"20px");
										$("#" + (msgId)).css(
												"border-bottom-right-radius",
												"5px");
										if (lastMsg !== "None") {
											$("#" + (msgId - 1)).css(
													"border-top-right-radius",
													"5px");
										} else {
											if (mesg[i - 1].name.toLowerCase() === userName
													.toLowerCase()) {
												$("#" + (msgId))
														.css(
																"border-top-right-radius",
																"5px");
												$("#" + (msgId))
														.css(
																"border-bottom-right-radius",
																"20px");
											}
										}
									}
									lastMsg = "me";
								} else {
									var msg1 = mesg[i].msg;
									if (msg1.startsWith("˚")) {
										msg1 = "<audio controls><source src='/Gibber/RetrievePic?name="
												+ msg1.substring(1)
												+ "&file=audio'>";

										$("#group")
												.prepend(
														"<abbr title='"
																+ mesg[i].time
																+ "'><div class='frnd1' id='"
																+ msgId
																+ "'>"
																+ msg1
																+ "</div></abbr>");
									} else if (msg1.startsWith("«")) {
										msg1 = "<img class='imgMsg' src='/Gibber/RetrievePic?name="
												+ msg1.substring(1)
												+ "&file=image'>";

										$("#group")
												.prepend(
														"<abbr title='"
																+ mesg[i].time
																+ "'><div class='frnd1' id='"
																+ msgId
																+ "'>"
																+ msg1
																+ "</div></abbr>");
									} else {
										var chk = true;
										if (msg1 === "😮" || msg1 === "😯") {
											msg1 = "<img class='me_emoji' src='emoji/13.gif'>";
											chk = false;
										} else if (msg1 === "🙂") {
											msg1 = "<img class='me_emoji' src='emoji/1.gif'>";
											chk = false;
										} else if (msg1 === "😍") {
											msg1 = "<img class='me_emoji' src='emoji/2.gif'>";
											chk = false;
										} else if (msg1 === "😜") {
											msg1 = "<img class='me_emoji' src='emoji/3.gif'>";
											chk = false;
										} else if (msg1 === "❤️") {
											msg1 = "<img class='me_emoji' src='emoji/4.gif'>";
											chk = false;
										} else if (msg1 === "😝️") {
											msg1 = "<img class='me_emoji' src='emoji/5.gif'>";
											chk = false;
										} else if (msg1 === "😐️") {
											msg1 = "<img class='me_emoji' src='emoji/6.gif'>";
											chk = false;
										} else if (msg1 === "😉") {
											msg1 = "<img class='me_emoji' src='emoji/7.gif'>";
											chk = false;
										} else if (msg1 === "👋") {
											msg1 = "<img class='me_emoji' src='emoji/8.gif'>";
											chk = false;
										} else if (msg1 === "💔") {
											msg1 = "<img class='me_emoji' src='emoji/9.gif'>";
											chk = false;
										} else if (msg1 === "🤤") {
											msg1 = "<img class='me_emoji' src='emoji/10.gif'>";
											chk = false;
										} else if (msg1 === "🙁") {
											msg1 = "<img class='me_emoji' src='emoji/11.gif'>";
											chk = false;
										} else if (msg1 === "😥") {
											msg1 = "<img class='me_emoji' src='emoji/12.gif'>";
											chk = false;
										} else if (msg1 === "😨") {
											msg1 = "<img class='me_emoji' src='emoji/14.gif'>";
											chk = false;
										} else if (msg1 === "😏") {
											msg1 = "<img class='me_emoji' src='emoji/15.gif'>";
											chk = false;
										} else if (msg1 === "😡") {
											msg1 = "<img class='me_emoji' src='emoji/16.gif'>";
											chk = false;
										} else if (msg1 === "😕") {
											msg1 = "<img class='me_emoji' src='emoji/17.gif'>";
											chk = false;
										} else if (msg1 === "😎") {
											msg1 = "<img class='me_emoji' src='emoji/18.gif'>";
											chk = false;
										} else if (msg1 === "💓") {
											msg1 = "<img class='me_emoji' src='emoji/19.gif'>";
											chk = false;
										}
										if (chk) {
											msg1 = msg1.replace("<",
													"<span><</span>");
											msg1 = $.trim(msg1);
											msg1 = msg1.replace("\n", "<br>");
											var sp = msg1.split(" ");
											var k;
											var v = null;
											var link = true;
											msg1 = "";
											for (k = 0; k < sp.length; k++) {
												var urlRE = new RegExp(
														"([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+");
												var check = sp[k].match(urlRE);
												if (check !== null) {
													link = false;
													msg1 += " <a href='"
															+ check[0]
															+ "' target='_blank'>"
															+ check[3]
															+ "</a> ";
													if (check[3]
															.includes(".youtube.")) {
														v = getAllUrlParams(check[0]).v;
													}
												} else {
													msg1 += sp[k] + " ";
												}
											}
											if (link) {
												if (msg1.includes("*")) {
													msg1 = msgSplit("*",
															"strike", msg1);
												}
												if (msg1.includes("_")) {
													msg1 = msgSplit("_", "i",
															msg1);
												}
												if (msg1.includes("-")) {
													msg1 = msgSplit("-", "b",
															msg1);
												}
											}

											if (v != null) {
												msgId++;
												$("#group")
														.prepend(
																"<abbr title='"
																		+ mesg[i].time
																		+ "'><div class='frnd1' id='"
																		+ msgId
																		+ "'><iframe "
																		+ "src=\"https://www.youtube.com/embed/"
																		+ v
																		+ "\"></iframe></div></abbr>");
												$("#" + (msgId - 1))
														.css(
																"border-bottom-left-radius",
																"5px");
											}

											$("#group")
													.prepend(
															"<abbr title='"
																	+ mesg[i].time
																	+ "'><div class='frnd1' id='"
																	+ msgId
																	+ "'>"
																	+ msg1
																	+ "</div></abbr>");
										} else {
											$("#group")
													.prepend(
															"<abbr title='"
																	+ mesg[i].time
																	+ "'><div class='frn1_emoji' id='"
																	+ msgId
																	+ "'>"
																	+ msg1
																	+ "</div></abbr>");
										}
									}
									if (lastMsg === "frnd") {
										$("#" + (msgId)).css(
												"border-top-left-radius",
												"20px");
										$("#" + (msgId)).css(
												"border-bottom-left-radius",
												"5px");
										$("#" + (msgId - 1))
												.css("border-top-left-radius",
														"5px");

									} else {
										if (mesg[i - 1].name.toLowerCase() === userName
												.toLowerCase()) {
											$("#" + (msgId)).css(
													"border-top-left-radius",
													"20px");
											$("#" + (msgId))
													.css(
															"border-bottom-left-radius",
															"5px");
										} else if (mesg[i - 1].name
												.toLowerCase() !== userName
												.toLowerCase()) {
											$("#" + (msgId)).css(
													"border-top-left-radius",
													"5px");
											$("#" + (msgId))
													.css(
															"border-bottom-left-radius",
															"20px");
										}

									}
									lastMsg = "frnd";
								}
							}
							lastDate = mesg[0].date;
							lastMsg = "None";
							var today = new Date();
							var dd = today.getDate();
							var mm = today.getMonth() + 1;
							var yyyy = today.getFullYear();

							if (dd < 10) {
								dd = '0' + dd;
							}
							var day = dateFormat(dd + '.' + mm + '.' + yyyy);
							if (dateFormat(mesg[i].date) === day) {
								$("#group").prepend(
										"<div class='date'>Today</div>");
							} else {
								$("#group").prepend(
										"<div class='date'>"
												+ dateFormat(mesg[i].date)
												+ "</div>");
							}

							var scrol = objDiv.scrollHeight > objDiv.clientHeight;
							alert(scrol);
							if (scrol) {
								$("#group").bind('scroll', scrolledTopG);
								if (grpclck) {
									grpclck = false;
									objDiv.scrollTop = objDiv.scrollHeight;
								} else {
									objDiv.scrollTop = (objDiv.scrollHeight - bfrHeight);
								}
							} else {
								num++;
								var obj = {};
								obj["num"] = num;
								obj["groupId"] = id;
								var json1 = JSON.stringify(obj);
								goupChatHistory(json1);
							}
						}
						$(".me").css("background-color", colr);
						$(".me1").css("background-color", colr);
					});
}

function scrolledTopG() {
	if ($("#group").scrollTop() == 0) {
		$('#group').unbind("scroll");
		var obj = {};
		num++;
		obj["num"] = num;
		obj["groupId"] = lastGrp;
		var json = JSON.stringify(obj);
		goupChatHistory(json);
	}
}
function scrolledTop() {
	if ($("#chat").scrollTop() == 0) {
		$('#chat').unbind("scroll");
		var obj = {};
		num++;
		obj["num"] = num;
		obj["frndName"] = friend;
		var json = JSON.stringify(obj);
		chatHistory.send(json);
	}
}
function sendMessage() {
	var mesg = $('#message').val();
	if (mesg !== "") {
		if (GroupIn) {
			var obj = {};
			obj["message"] = mesg;
			obj["groupId"] = lastGrp;
			var json = JSON.stringify(obj);
			groupChat.send(json);
			$('#message').val("");
			$('#message').focus();
		} else {
			var obj = {};
			obj["message"] = mesg;
			obj["friend"] = friend;
			var json = JSON.stringify(obj);
			chat.send(json);
			$('#message').val("");
			$('#message').focus();
		}
	}
}
var findFrnd;
var frndRqst;
var chtFrnds;
var frndRqstStatus;
var chat;
var groupChat;
var chatHistory;
var ppUpload;
var uploadPic;
var uploadAudio;
window.addEventListener("beforeunload", function(e) {
	findFrnd.close();
	frndRqst.close();
	chtFrnds.close();
	groupChat.close();
	frndRqstStatus.close();
	chat.close();
	chatHistory.close();
	ppUpload.close();
	uploadPic.close();
	uploadAudio.close();
});
var typing = false;
var lastMsg = "None";
var msgId = 0;
function keyPress() {
	chat.send("~" + friend);
}
function typingOver() {
	$("#typing").remove();
	typing = false;
}
function dateFormat(oldDate) {
	var res = oldDate.split(".");
	var date = parseInt(res[0]);
	var month = parseInt(res[1]);
	var year = parseInt(res[2]);
	var monthNames = [ "", "January", "February", "March", "April", "May",
			"June", "July", "August", "September", "October", "November",
			"December" ];
	var newDate = date + " " + monthNames[month] + " " + year;
	return newDate;
}
function msgSplit(regex, tag, msg) {
	var res = msg.split(regex);
	var b = true, n = false;
	var r = res.length - 1, j;
	if (r % 2 != 0) {
		r--;
		n = true;
	}
	msg = "";
	for (j = 0; j < r; j++) {
		if (b) {
			msg += res[j] + "<" + tag + ">";
			b = false;
		} else {
			msg += res[j] + "</" + tag + ">";
			b = true;
		}
	}
	if (n) {
		msg += res[res.length - 2] + "*";
	}
	msg += res[res.length - 1];
	return msg;
}
var lastDate;
function getAllUrlParams(url) {

	var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

	var obj = {};

	if (queryString) {

		queryString = queryString.split('#')[0];

		var arr = queryString.split('&');

		for (var i = 0; i < arr.length; i++) {
			var a = arr[i].split('=');

			var paramNum = undefined;
			var paramName = a[0].replace(/\[\d*\]/, function(v) {
				paramNum = v.slice(1, -1);
				return '';
			});

			var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

			if (obj[paramName]) {
				if (typeof obj[paramName] === 'string') {
					obj[paramName] = [ obj[paramName] ];
				}
				if (typeof paramNum === 'undefined') {
					obj[paramName].push(paramValue);
				} else {
					obj[paramName][paramNum] = paramValue;
				}
			} else {
				obj[paramName] = paramValue;
			}
		}
	}

	return obj;
}
function animate(id) {
	var ti = 100;
	var pos1 = 25;
	var pos2 = -25;
	$("#" + id).animate({
		position : 'absolute',
		left : pos1
	}, ti);
	$("#" + id).animate({
		position : 'absolute',
		left : pos2
	}, ti);
	$("#" + id).animate({
		position : 'absolute',
		left : pos1
	}, ti);
	$("#" + id).animate({
		position : 'absolute',
		left : pos2
	}, ti);
	$("#" + id).animate({
		position : 'absolute',
		left : pos1
	}, ti);
	$("#" + id).animate({
		position : 'absolute',
		left : pos2
	}, ti);
	$("#" + id).animate({
		position : 'absolute',
		left : 0
	}, ti);
	$("#" + id).val('');
}
var userName;
var prof_pi = true;
var colr = null;
var uuid = null;
var frndPic = null;
var uuid1 = null;
var frndAudio = null;
function changePass() {
	var oldPass = document.getElementById("pass1").value;
	var newPass = document.getElementById("pass2").value;
	var cnfrmPass = document.getElementById("pass3").value;
	if (newPass === cnfrmPass) {
		$
				.post(
						"/Gibber/change_pass",
						{
							name : userName,
							newPass : cnfrmPass,
							oldPass : oldPass
						},
						function(data, status) {
							if (data === "Done") {
								$("#notification").html(
										"Password successfully changed");
								$("#notification").slideDown(200);
								setTimeout(slideUpNotification, 3500);
								$("#pass1").val('');
								$("#pass2").val('');
								$("#pass3").val('');
								$('#change_pass').slideUp(200);
							} else if (data === "Same") {
								$("#notification")
										.html(
												"The new password you entered was same as the old one");
								$("#notification").slideDown(200);
								setTimeout(slideUpNotification, 3500);
								$("#pass2").val('');
								$("#pass3").val('');
							} else {
								$("#notification").html(
										"You have entered a wrong password");
								$("#notification").slideDown(200);
								setTimeout(slideUpNotification, 3500);
								$("#pass1").val('');
							}
						});
	} else {
		$("#notification").html("Confirm password not matching.");
		$("#notification").slideDown(200);
		setTimeout(slideUpNotification, 3500);
		animate("pass3");
		animate("pass2");
	}
}
function srchMyFrnds() {
	var s = $("#add_participants").val();
	if (s === "") {
		$("#suggestion").html("");
	} else {
		$
				.post(
						"/Gibber/search_my_friend",
						{
							name : s,
							user_name : userName
						},
						function(data, status) {
							if (data !== "{\"frnds\":[]}") {
								var d = $.parseJSON(data), k;
								$("#suggestion").html("");
								for (k = 0; k < d.frnds.length; k++) {
									var check = false;
									for (i = 0; i <= n; i++) {
										if (participants[i] === d.frnds[k]) {
											check = true;
										}
									}
									if (check) {
										$("#suggestion")
												.append(
														"<div class='ava_frnd'><div class='profile1'><img class='frndProfImg1'src='/Gibber/ProfliePic?name="
																+ d.frnds[k]
																+ ".png'></div><div class='name1'>"
																+ d.frnds[k]
																+ "</div><div id='add_"
																+ d.frnds[k]
																+ "' class='addGrp' onclick=\"addFrnd('"
																+ d.frnds[k]
																+ "')\">Remove</div><br><hr></div>");
									} else {
										$("#suggestion")
												.append(
														"<div class='ava_frnd'><div class='profile1'><img class='frndProfImg1'src='/Gibber/ProfliePic?name="
																+ d.frnds[k]
																+ ".png'></div><div class='name1'>"
																+ d.frnds[k]
																+ "</div><div id='add_"
																+ d.frnds[k]
																+ "' class='addGrp' onclick=\"addFrnd('"
																+ d.frnds[k]
																+ "')\">Add +</div><br><hr></div>");
									}
								}
							}
						});
	}
}
var participants = [];
var n = 0;

function addFrnd(id) {
	if (participants.includes(id)) {
		participants.splice(id, 1);
		$("#add_" + id).html("add+");
		$("#add_" + id).css({
			"background-color" : "#3399ff"
		});
	} else {
		$("#add_" + id).html("Remove");
		$("#add_" + id).css({
			"background-color" : "#656565"
		});
		participants[n++] = id;
	}
}
function srchFrnds() {
	var s = $("#findFrndTextBox").val();
	if (s === "") {
		$("#available_frnds").html("");
	} else {

		$
				.post(
						"/Gibber/search_friend",
						{
							name : s,
							user_name : userName
						},
						function(data, status) {
							var d = $.parseJSON(data), k;
							$("#available_frnds").html("");
							for (k = 0; k < d.data.yes.length; k++) {
								$("#available_frnds")
										.append(
												"<div class='ava_frnd'><div class='profile'><img class='frndProfImg'src='/Gibber/ProfliePic?name="
														+ d.data.yes[k]
														+ ".png'></div><div class='name'>"
														+ d.data.yes[k]
														+ "</div><div class='pending_req')'>Request Pending</div><br><hr></div>");
							}
							for (k = 0; k < d.data.no.length; k++) {
								$("#available_frnds")
										.append(
												"<div class='ava_frnd'><div class='profile'><img class='frndProfImg'src='/Gibber/ProfliePic?name="
														+ d.data.no[k]
														+ ".png'></div><div class='name'>"
														+ d.data.no[k]
														+ "</div><div class='send_req' id='req_"
														+ d.data.no[k]
														+ "' onclick='javascript:sendReq(\""
														+ d.data.no[k]
														+ "\")'>Send Request</div><br><hr></div>");
							}
						});
	}
}

function sendReq(nam) {
	findFrnd.send(nam);
	$("#req_" + nam).css({
		"background-color" : "#424242"
	});
	$("#req_" + nam).html("Request Pending");
	$("#findFrndTextBox").val(nam);
}

function main() {
	if ("WebSocket" in window) {
		$("#message").keypress(function() {
			keyPress();
		});

		$("#findFrndTextBox").keyup(function() {
			srchFrnds();
		});
		$("#add_participants").keyup(function() {
			srchMyFrnds();
		});

		var h = "ws://localhost:8080/Gibber/";

		uploadPic = new WebSocket(h + "photo_upload");

		uploadPic.onmessage = function(evt) {
			var msg = evt.data;
			if (msg === "`") {
				uploadPic.send("end," + frndPic + "," + uuid);
			} else if (msg.startsWith("~")) {
				msg = msg.substring(1);
				var res = msg.split(",");
				uuid = res[0];
				frndPic = res[1];
			} else if (msg.startsWith("∑")) {
				msg = msg.substring(1);
				var res = msg.split("∑");
				if (res[0].toLowerCase() === friend.toLowerCase()) {
					$("#chat")
							.append(
									"<abbr title='"
											+ res[2]
											+ "'><div class='frnd1' id='"
											+ msgId
											+ "'><img class='imgMsg' src='/Gibber/RetrievePic?name="
											+ res[1]
											+ "&file=image'></div></abbr>");
					$("#" + (msgId - 1)).css("border-radius", "20px");
					msgId++;
					$("#chat").animate({
						scrollTop : $('#chat').prop("scrollHeight")
					}, 500);
				}
				$("#prvw_" + friend).html("Sent an image.");
			} else {
				var res = msg.split("∑");
				$("#chat")
						.append(
								"<abbr title='"
										+ res[1]
										+ "'><div class='me1' id='"
										+ msgId
										+ "'><img class='imgMsg' src='/Gibber/RetrievePic?name="
										+ res[0] + "&file=image'></div></abbr>");
				$("#" + (msgId - 1)).css("border-radius", "20px");
				$("#prvw_" + friend).html("You sent an image.");
				$("#chat").animate({
					scrollTop : $('#chat').prop("scrollHeight")
				}, 500);
			}

			$(".me").css("background-color", colr);
			$(".me1").css("background-color", colr);
		};
		uploadPic.onclose = function(message) {
		};

		uploadAudio = new WebSocket(h + "audio_upload");

		uploadAudio.onmessage = function(evt) {
			var msg = evt.data;
			if (msg === "`") {
				uploadAudio.send("end," + frndAudio + "," + uuid1);
			} else if (msg.startsWith("~")) {
				msg = msg.substring(1);
				var res = msg.split(",");
				uuid1 = res[0];
				frndAudio = res[1];
			} else if (msg.startsWith("∑")) {
				msg = msg.substring(1);
				var res = msg.split("∑");
				if (res[0].toLowerCase() === friend.toLowerCase()) {
					$("#chat")
							.append(
									"<abbr title='"
											+ res[2]
											+ "'><div class='frnd1' id='"
											+ msgId
											+ "'><audio controls><source src='/Gibber/RetrievePic?name="
											+ res[1]
											+ "&file=audio'></audio></div></abbr>");
					$("#" + (msgId - 1)).css("border-radius", "20px");
					msgId++;
				}
				$("#prvw_" + friend).html("Sent an audio.");
				$("#chat").animate({
					scrollTop : $('#chat').prop("scrollHeight")
				}, 500);
			} else {
				var res = msg.split("∑");
				$("#chat")
						.append(
								"<abbr title='"
										+ res[1]
										+ "'><div class='me1' id='"
										+ msgId
										+ "'><audio controls><source src='/Gibber/RetrievePic?name="
										+ res[0]
										+ "&file=audio'></audio></div></abbr>");
				$("#" + (msgId - 1)).css("border-radius", "20px");
				$("#chat").animate({
					scrollTop : $('#chat').prop("scrollHeight")
				}, 500);
				$("#prvw_" + friend).html("You sent an audio.");
			}

			$(".me").css("background-color", colr);
			$(".me1").css("background-color", colr);
		};
		uploadAudio.onclose = function(message) {
		};

		ppUpload = new WebSocket(h + "upload");

		ppUpload.onmessage = function(evt) {
			prof_pi = true;
			$("#profRe").html(
					"<img id='profImg' src='/Gibber/ProfliePic?name="
							+ userName + ".png'>");
		};
		ppUpload.onclose = function(message) {
		};

		chatHistory = new WebSocket(h + "get_chat_history");
		chatHistory.onopen = function(message) {
		};
		chatHistory.onmessage = function(evt) {

			lastMsg = "None";
			var msg = evt.data;
			var obj = $.parseJSON(msg);
			var mesg = obj.message;
			var i;
			var objDiv = document.getElementById("chat");
			var bfrHeight = objDiv.scrollHeight;
			if (msg != "{}") {
				for (i = (mesg.length - 1); i > 0; i--) {
					msgId++;
					if (mesg[i].who === "me") {

						var msg1 = mesg[i].me;
						if (msg1.startsWith("˚")) {
							msg1 = "<audio controls><source src='/Gibber/RetrievePic?name="
									+ msg1.substring(1) + "&file=audio'>";

							$("#chat").prepend(
									"<abbr title='" + mesg[i].time
											+ "'><div class='me1' id='" + msgId
											+ "'>" + msg1 + "</div></abbr>");
						} else if (msg1.startsWith("«")) {
							msg1 = "<img class='imgMsg' src='/Gibber/RetrievePic?name="
									+ msg1.substring(1) + "&file=image'>";

							$("#chat").prepend(
									"<abbr title='" + mesg[i].time
											+ "'><div class='me1' id='" + msgId
											+ "'>" + msg1 + "</div></abbr>");
						} else {
							var chk = true;
							if (msg1 === "😮" || msg1 === "😯") {
								msg1 = "<img class='me_emoji' src='emoji/13.gif'>";
								chk = false;
							} else if (msg1 === "🙂") {
								msg1 = "<img class='me_emoji' src='emoji/1.gif'>";
								chk = false;
							} else if (msg1 === "😍") {
								msg1 = "<img class='me_emoji' src='emoji/2.gif'>";
								chk = false;
							} else if (msg1 === "😜") {
								msg1 = "<img class='me_emoji' src='emoji/3.gif'>";
								chk = false;
							} else if (msg1 === "❤️") {
								msg1 = "<img class='me_emoji' src='emoji/4.gif'>";
								chk = false;
							} else if (msg1 === "😝️") {
								msg1 = "<img class='me_emoji' src='emoji/5.gif'>";
								chk = false;
							} else if (msg1 === "😐️") {
								msg1 = "<img class='me_emoji' src='emoji/6.gif'>";
								chk = false;
							} else if (msg1 === "😉") {
								msg1 = "<img class='me_emoji' src='emoji/7.gif'>";
								chk = false;
							} else if (msg1 === "👋") {
								msg1 = "<img class='me_emoji' src='emoji/8.gif'>";
								chk = false;
							} else if (msg1 === "💔") {
								msg1 = "<img class='me_emoji' src='emoji/9.gif'>";
								chk = false;
							} else if (msg1 === "🤤") {
								msg1 = "<img class='me_emoji' src='emoji/10.gif'>";
								chk = false;
							} else if (msg1 === "🙁") {
								msg1 = "<img class='me_emoji' src='emoji/11.gif'>";
								chk = false;
							} else if (msg1 === "😥") {
								msg1 = "<img class='me_emoji' src='emoji/12.gif'>";
								chk = false;
							} else if (msg1 === "😨") {
								msg1 = "<img class='me_emoji' src='emoji/14.gif'>";
								chk = false;
							} else if (msg1 === "😏") {
								msg1 = "<img class='me_emoji' src='emoji/15.gif'>";
								chk = false;
							} else if (msg1 === "😡") {
								msg1 = "<img class='me_emoji' src='emoji/16.gif'>";
								chk = false;
							} else if (msg1 === "😕") {
								msg1 = "<img class='me_emoji' src='emoji/17.gif'>";
								chk = false;
							} else if (msg1 === "😎") {
								msg1 = "<img class='me_emoji' src='emoji/18.gif'>";
								chk = false;
							} else if (msg1 === "💓") {
								msg1 = "<img class='me_emoji' src='emoji/19.gif'>";
								chk = false;
							}
							if (chk) {
								if (msg1.includes("<")) {
									var res = msg1.split("<");
									msg1 = "";
									var j;
									for (j = 0; j < res.length - 1; j++) {
										msg1 += res[j] + "<span><</span>";
									}
									msg1 += res[res.length - 1];
								}
								msg1 = $.trim(msg1);
								if (msg1.includes("\n")) {
									var res = msg1.split("\n");
									msg1 = "";
									var j;
									for (j = 0; j < res.length; j++) {
										msg1 += res[j] + "<br>";
									}
								}
								var sp = msg1.split(" ");
								var k;
								var v = null;
								var link = true;
								msg1 = "";
								for (k = 0; k < sp.length; k++) {
									var urlRE = new RegExp(
											"([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+");
									var check = sp[k].match(urlRE);
									if (check !== null) {
										link = false;
										msg1 += " <a href='" + check[0]
												+ "' target='_blank'>"
												+ check[3] + "</a> ";
										if (check[3].includes(".youtube.")) {
											v = getAllUrlParams(check[0]).v;
										}
									} else {
										msg1 += sp[k] + " ";
									}
								}
								if (link) {
									if (msg1.includes("*")) {
										msg1 = msgSplit("*", "strike", msg1);
									}
									if (msg1.includes("_")) {
										msg1 = msgSplit("_", "i", msg1);
									}
									if (msg1.includes("-")) {
										msg1 = msgSplit("-", "b", msg1);
									}
								}
								if (v != null) {
									msgId++;
									$("#chat")
											.prepend(
													"<abbr title='"
															+ mesg[i].time
															+ "'><div class='me1' id='"
															+ msgId
															+ "'><iframe width=\"480\" height=\"300\" "
															+ "src=\"https://www.youtube.com/embed/"
															+ v
															+ "\"></iframe></div></abbr>");
									$("#" + (msgId - 1))
											.css("border-bottom-right-radius",
													"5px");
								}
								$("#chat").prepend(
										"<abbr title='" + mesg[i].time
												+ "'><div class='me1' id='"
												+ msgId + "'>" + msg1
												+ "</div></abbr>");
							} else {
								$("#chat").prepend(
										"<abbr title='" + mesg[i].time
												+ "'><div class='me1_emo' id='"
												+ msgId + "'>" + msg1
												+ "</div></abbr>");
							}
						}
						if (lastMsg === "frnd") {
							if (i != 0 && mesg[i - 1].who === "me") {
								$("#" + (msgId)).css("border-top-right-radius",
										"5px");
								$("#" + (msgId)).css(
										"border-bottom-right-radius", "20px");
							} else if (i != 0 && (mesg[i - 1].who === "friend")) {
								$("#" + (msgId)).css("border-top-right-radius",
										"20px");
								$("#" + (msgId)).css(
										"border-bottom-right-radius", "5px");
							} else {
								$("#" + (msgId)).css("border-top-right-radius",
										"20px");
								$("#" + (msgId)).css(
										"border-bottom-right-radius", "5px");
							}

						} else {
							$("#" + (msgId)).css("border-top-right-radius",
									"20px");
							$("#" + (msgId)).css("border-bottom-right-radius",
									"5px");
							if (lastMsg !== "None") {
								$("#" + (msgId - 1)).css(
										"border-top-right-radius", "5px");
							} else {
								if (i != 0 && mesg[i - 1].who === "me") {
									$("#" + (msgId)).css(
											"border-top-right-radius", "5px");
									$("#" + (msgId)).css(
											"border-bottom-right-radius",
											"20px");
								}
							}
						}
						lastMsg = "me";
					} else {
						var msg1 = mesg[i].friend;
						if (msg1.startsWith("˚")) {
							msg1 = "<audio controls><source src='/Gibber/RetrievePic?name="
									+ msg1.substring(1) + "&file=audio'>";

							$("#chat").prepend(
									"<abbr title='" + mesg[i].time
											+ "'><div class='frnd1' id='"
											+ msgId + "'>" + msg1
											+ "</div></abbr>");
						} else if (msg1.startsWith("«")) {
							msg1 = "<img class='imgMsg' src='/Gibber/RetrievePic?name="
									+ msg1.substring(1) + "&file=image'>";

							$("#chat").prepend(
									"<abbr title='" + mesg[i].time
											+ "'><div class='frnd1' id='"
											+ msgId + "'>" + msg1
											+ "</div></abbr>");
						} else {
							var chk = true;
							if (msg1 === "😮" || msg1 === "😯") {
								msg1 = "<img class='me_emoji' src='emoji/13.gif'>";
								chk = false;
							} else if (msg1 === "🙂") {
								msg1 = "<img class='me_emoji' src='emoji/1.gif'>";
								chk = false;
							} else if (msg1 === "😍") {
								msg1 = "<img class='me_emoji' src='emoji/2.gif'>";
								chk = false;
							} else if (msg1 === "😜") {
								msg1 = "<img class='me_emoji' src='emoji/3.gif'>";
								chk = false;
							} else if (msg1 === "❤️") {
								msg1 = "<img class='me_emoji' src='emoji/4.gif'>";
								chk = false;
							} else if (msg1 === "😝️") {
								msg1 = "<img class='me_emoji' src='emoji/5.gif'>";
								chk = false;
							} else if (msg1 === "😐️") {
								msg1 = "<img class='me_emoji' src='emoji/6.gif'>";
								chk = false;
							} else if (msg1 === "😉") {
								msg1 = "<img class='me_emoji' src='emoji/7.gif'>";
								chk = false;
							} else if (msg1 === "👋") {
								msg1 = "<img class='me_emoji' src='emoji/8.gif'>";
								chk = false;
							} else if (msg1 === "💔") {
								msg1 = "<img class='me_emoji' src='emoji/9.gif'>";
								chk = false;
							} else if (msg1 === "🤤") {
								msg1 = "<img class='me_emoji' src='emoji/10.gif'>";
								chk = false;
							} else if (msg1 === "🙁") {
								msg1 = "<img class='me_emoji' src='emoji/11.gif'>";
								chk = false;
							} else if (msg1 === "😥") {
								msg1 = "<img class='me_emoji' src='emoji/12.gif'>";
								chk = false;
							} else if (msg1 === "😨") {
								msg1 = "<img class='me_emoji' src='emoji/14.gif'>";
								chk = false;
							} else if (msg1 === "😏") {
								msg1 = "<img class='me_emoji' src='emoji/15.gif'>";
								chk = false;
							} else if (msg1 === "😡") {
								msg1 = "<img class='me_emoji' src='emoji/16.gif'>";
								chk = false;
							} else if (msg1 === "😕") {
								msg1 = "<img class='me_emoji' src='emoji/17.gif'>";
								chk = false;
							} else if (msg1 === "😎") {
								msg1 = "<img class='me_emoji' src='emoji/18.gif'>";
								chk = false;
							} else if (msg1 === "💓") {
								msg1 = "<img class='me_emoji' src='emoji/19.gif'>";
								chk = false;
							}
							if (chk) {

								if (msg1.includes("\n")) {
									var res = msg1.split("\n");
									msg1 = "";
									var j;
									for (j = 0; j < res.length; j++) {
										msg1 += res[j] + "<br>";
									}
								}
								if (msg1.includes("<")) {
									var res = msg1.split("<");
									msg1 = "";
									var j;
									for (j = 0; j < res.length - 1; j++) {
										msg1 += res[j] + "<span><</span>";
									}
									msg1 += res[res.length - 1];
								}
								msg1 = $.trim(msg1);
								if (msg1.includes("\n")) {
									var res = msg1.split("\n");
									msg1 = "";
									var j;
									for (j = 0; j < res.length; j++) {
										msg1 += res[j] + "<br>";
									}

								}
								var sp = msg1.split(" ");
								var k;
								var v = null;
								var link = true;
								msg1 = "";
								for (k = 0; k < sp.length; k++) {
									var urlRE = new RegExp(
											"([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+");
									var check = sp[k].match(urlRE);
									if (check !== null) {
										link = false;
										msg1 += " <a href='" + check[0]
												+ "' target='_blank'>"
												+ check[3] + "</a> ";
										if (check[3].includes(".youtube.")) {
											v = getAllUrlParams(check[0]).v;
										}
									} else {
										msg1 += sp[k] + " ";
									}
								}
								if (link) {
									if (msg1.includes("*")) {
										msg1 = msgSplit("*", "strike", msg1);
									}
									if (msg1.includes("_")) {
										msg1 = msgSplit("_", "i", msg1);
									}
									if (msg1.includes("-")) {
										msg1 = msgSplit("-", "b", msg1);
									}
								}

								if (v != null) {
									msgId++;
									$("#chat")
											.prepend(
													"<abbr title='"
															+ mesg[i].time
															+ "'><div class='frnd1' id='"
															+ msgId
															+ "'><iframe "
															+ "src=\"https://www.youtube.com/embed/"
															+ v
															+ "\"></iframe></div></abbr>");
									$("#" + (msgId - 1)).css(
											"border-bottom-left-radius", "5px");
								}

								$("#chat").prepend(
										"<abbr title='" + mesg[i].time
												+ "'><div class='frnd1' id='"
												+ msgId + "'>" + msg1
												+ "</div></abbr>");
							} else {
								$("#chat")
										.prepend(
												"<abbr title='"
														+ mesg[i].time
														+ "'><div class='frn1_emoji' id='"
														+ msgId + "'>" + msg1
														+ "</div></abbr>");
							}
						}
						if (lastMsg === "frnd") {
							if (lastMsg !== "None") {
								$("#" + (msgId)).css("border-top-left-radius",
										"20px");
								$("#" + (msgId)).css(
										"border-bottom-left-radius", "5px");
								$("#" + (msgId - 1)).css(
										"border-top-left-radius", "5px");
							}

						} else {
							if (i != 0 && mesg[i - 1].who === "me") {
								$("#" + (msgId)).css("border-top-left-radius",
										"20px");
								$("#" + (msgId)).css(
										"border-bottom-left-radius", "5px");
							} else if (i != 0 && (mesg[i - 1].who === "friend")) {
								$("#" + (msgId)).css("border-top-left-radius",
										"5px");
								$("#" + (msgId)).css(
										"border-bottom-left-radius", "20px");
							} else {
								$("#" + (msgId)).css("border-top-left-radius",
										"20px");
								$("#" + (msgId)).css(
										"border-bottom-left-radius", "5px");
							}

						}
						lastMsg = "frnd";
					}
				}

				lastDate = mesg[0].date;
				lastMsg = "None";
				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth() + 1;
				var yyyy = today.getFullYear();

				if (dd < 10) {
					dd = '0' + dd;
				}
				var day = dateFormat(dd + '.' + mm + '.' + yyyy);
				if (dateFormat(mesg[i].date) === day) {
					$("#chat").prepend("<div class='date'>Today</div>");
				} else {
					$("#chat").prepend(
							"<div class='date'>" + dateFormat(mesg[i].date)
									+ "</div>");
				}

				var scrol = objDiv.scrollHeight > objDiv.clientHeight;
				if (scrol) {
					$("#chat").bind('scroll', scrolledTop);
					if (frndclck) {
						frndclck = false;
						objDiv.scrollTop = objDiv.scrollHeight;
					} else {
						objDiv.scrollTop = (objDiv.scrollHeight - bfrHeight);
					}
				} else {
					num++;
					var obj = {};
					obj["num"] = num;
					obj["frndName"] = friend;
					var json = JSON.stringify(obj);
					chatHistory.send(json);
				}
			}
			$(".me").css("background-color", colr);
			$(".me1").css("background-color", colr);
		};
		chatHistory.onclose = function(message) {
		};
		chatHistory.onerror = function(message) {
			alert("An error!");
		};

		groupChat = new WebSocket(h + "group_chat");
		groupChat.onopen = function(message) {
		};
		groupChat.onmessage = function(evt) {
			var msg = evt.data;
			if (msg.startsWith("~")) {
				msg = msg.substring(1);
				if (msg.toLowerCase() === friend.toLowerCase()) {
					if (!typing) {
						typing = true;
						var elem = $("#group");
						var bool = elem[0].scrollHeight - elem.scrollTop() == elem
								.outerHeight();
						$("#group")
								.append(
										"<div class='frnd1' id='typing'><img src='images/dot.gif' id='dot'></div>");
						var height = $('#chat').prop("scrollHeight");
						if (bool) {
							$('#group').animate({
								scrollTop : height
							}, 500);
						}
						setTimeout(typingOver, 3000);
					}
				}
			} else {
				var obj = $.parseJSON(msg);
				var mesg = obj.message;
				var temp = mesg;
				if (mesg.length > 20) {
					temp = mesg.substring(0, 20) + "...";
				}
				temp = temp.replace("<", "<span><</span>");
				temp = $.trim(temp);
				if (obj.name === userName.toLowerCase()) {
					$("#prvw_" + obj.groupId).html("You : " + temp);
				} else {
					$("#prvw_" + obj.groupId).html(temp);
				}

				if (obj.groupId === lastGrp) {
					$("#typing").remove();
					if (obj.date !== lastDate) {
						lastMsg = "None";
						lastDate = obj.date;
						var today = new Date();
						var dd = today.getDate();
						var mm = today.getMonth() + 1;
						var yyyy = today.getFullYear();

						if (dd < 10) {
							dd = '0' + dd;
						}
						var day = dateFormat(dd + '.' + mm + '.' + yyyy);
						if (dateFormat(obj.date) === day) {
							$("#group").append("<div class='date'>Today</div>");
						} else {
							$("#group").append(
									"<div class='date'>" + dateFormat(obj.date)
											+ "</div>");
						}
					}

					mesg = mesg.replace("<", "<span><</span>");
					mesg = mesg.replace("\n", "<br>");
					var sp = mesg.split(" ");
					var k;
					var link = true;
					mesg = "";
					var v = null;
					for (k = 0; k < sp.length; k++) {
						var urlRE = new RegExp(
								"([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+");
						var check = sp[k].match(urlRE);
						if (check !== null) {
							link = false;
							mesg += " <a href='" + check[0]
									+ "' target='_blank'>" + check[3] + "</a> ";
							if (check[3].includes(".youtube.")) {
								v = getAllUrlParams(check[0]).v;
							}
						} else {
							mesg += sp[k] + " ";
						}
					}
					if (link) {
						if (mesg.includes("*")) {
							mesg = msgSplit("*", "b", mesg);
						}
						if (mesg.includes("_")) {
							mesg = msgSplit("_", "i", mesg);
						}
						if (mesg.includes("-")) {
							mesg = msgSplit("-", "strike", mesg);
						}
					}

					msgId++;
					var msg1 = obj.message;
					if (obj.name === userName.toLowerCase()) {
						var chk = true;
						if (msg1 === "😮" || msg1 === "😯") {
							msg1 = "<img class='me_emoji' src='emoji/13.gif'>";
							chk = false;
						} else if (msg1 === "🙂") {
							msg1 = "<img class='me_emoji' src='emoji/1.gif'>";
							chk = false;
						} else if (msg1 === "😍") {
							msg1 = "<img class='me_emoji' src='emoji/2.gif'>";
							chk = false;
						} else if (msg1 === "😜") {
							msg1 = "<img class='me_emoji' src='emoji/3.gif'>";
							chk = false;
						} else if (msg1 === "❤️") {
							msg1 = "<img class='me_emoji' src='emoji/4.gif'>";
							chk = false;
						} else if (msg1 === "😝️") {
							msg1 = "<img class='me_emoji' src='emoji/5.gif'>";
							chk = false;
						} else if (msg1 === "😐️") {
							msg1 = "<img class='me_emoji' src='emoji/6.gif'>";
							chk = false;
						} else if (msg1 === "😉") {
							msg1 = "<img class='me_emoji' src='emoji/7.gif'>";
							chk = false;
						} else if (msg1 === "👋") {
							msg1 = "<img class='me_emoji' src='emoji/8.gif'>";
							chk = false;
						} else if (msg1 === "💔") {
							msg1 = "<img class='me_emoji' src='emoji/9.gif'>";
							chk = false;
						} else if (msg1 === "🤤") {
							msg1 = "<img class='me_emoji' src='emoji/10.gif'>";
							chk = false;
						} else if (msg1 === "🙁") {
							msg1 = "<img class='me_emoji' src='emoji/11.gif'>";
							chk = false;
						} else if (msg1 === "😥") {
							msg1 = "<img class='me_emoji' src='emoji/12.gif'>";
							chk = false;
						} else if (msg1 === "😨") {
							msg1 = "<img class='me_emoji' src='emoji/14.gif'>";
							chk = false;
						} else if (msg1 === "😏") {
							msg1 = "<img class='me_emoji' src='emoji/15.gif'>";
							chk = false;
						} else if (msg1 === "😡") {
							msg1 = "<img class='me_emoji' src='emoji/16.gif'>";
							chk = false;
						} else if (msg1 === "😕") {
							msg1 = "<img class='me_emoji' src='emoji/17.gif'>";
							chk = false;
						} else if (msg1 === "😎") {
							msg1 = "<img class='me_emoji' src='emoji/18.gif'>";
							chk = false;
						} else if (msg1 === "💓") {
							msg1 = "<img class='me_emoji' src='emoji/19.gif'>";
							chk = false;
						}
						if (chk) {
							if (lastMsg === "me") {
								$("#group").append(
										"<abbr title='" + obj.time
												+ "'><div class='me1' id='"
												+ msgId + "'>" + mesg
												+ "</div></abbr>");
								$("#" + (msgId - 1)).animate({
									borderBottomRightRadius : "5px"
								});
							} else {
								$("#group").append(
										"<abbr title='" + obj.time
												+ "'><div class='me' id='"
												+ msgId + "'>" + mesg
												+ "</div></abbr>");
							}
							if (v != null) {

								msgId++;
								$("#group")
										.append(
												"<abbr title='"
														+ obj.time
														+ "'><div class='me1' id='"
														+ msgId
														+ "'><iframe width=\"480\" height=\"300\" "
														+ "src=\"https://www.youtube.com/embed/"
														+ v
														+ "\"></iframe></div></abbr>");
								$("#" + (msgId - 1)).css(
										"border-bottom-right-radius", "5px");
							}
						} else {
							$("#group").append(
									"<abbr title='" + obj.time
											+ "'><div class='me1_emo' id='"
											+ msgId + "'>" + msg1
											+ "</div></abbr>");
						}
						$('#group').animate({
							scrollTop : $('#chat').prop("scrollHeight")
						}, 500);
						lastMsg = "me";
					} else {
						var chk = true;
						if (msg1 === "😮" || msg1 === "😯") {
							msg1 = "<img class='me_emoji' src='emoji/13.gif'>";
							chk = false;
						} else if (msg1 === "🙂") {
							msg1 = "<img class='me_emoji' src='emoji/1.gif'>";
							chk = false;
						} else if (msg1 === "😍") {
							msg1 = "<img class='me_emoji' src='emoji/2.gif'>";
							chk = false;
						} else if (msg1 === "😜") {
							msg1 = "<img class='me_emoji' src='emoji/3.gif'>";
							chk = false;
						} else if (msg1 === "❤️") {
							msg1 = "<img class='me_emoji' src='emoji/4.gif'>";
							chk = false;
						} else if (msg1 === "😝️") {
							msg1 = "<img class='me_emoji' src='emoji/5.gif'>";
							chk = false;
						} else if (msg1 === "😐️") {
							msg1 = "<img class='me_emoji' src='emoji/6.gif'>";
							chk = false;
						} else if (msg1 === "😉") {
							msg1 = "<img class='me_emoji' src='emoji/7.gif'>";
							chk = false;
						} else if (msg1 === "👋") {
							msg1 = "<img class='me_emoji' src='emoji/8.gif'>";
							chk = false;
						} else if (msg1 === "💔") {
							msg1 = "<img class='me_emoji' src='emoji/9.gif'>";
							chk = false;
						} else if (msg1 === "🤤") {
							msg1 = "<img class='me_emoji' src='emoji/10.gif'>";
							chk = false;
						} else if (msg1 === "🙁") {
							msg1 = "<img class='me_emoji' src='emoji/11.gif'>";
							chk = false;
						} else if (msg1 === "😥") {
							msg1 = "<img class='me_emoji' src='emoji/12.gif'>";
							chk = false;
						} else if (msg1 === "😨") {
							msg1 = "<img class='me_emoji' src='emoji/14.gif'>";
							chk = false;
						} else if (msg1 === "😏") {
							msg1 = "<img class='me_emoji' src='emoji/15.gif'>";
							chk = false;
						} else if (msg1 === "😡") {
							msg1 = "<img class='me_emoji' src='emoji/16.gif'>";
							chk = false;
						} else if (msg1 === "😕") {
							msg1 = "<img class='me_emoji' src='emoji/17.gif'>";
							chk = false;
						} else if (msg1 === "😎") {
							msg1 = "<img class='me_emoji' src='emoji/18.gif'>";
							chk = false;
						} else if (msg1 === "💓") {
							msg1 = "<img class='me_emoji' src='emoji/19.gif'>";
							chk = false;
						}
						if (chk) {

							if (lastMsg === obj.name) {
								$("#group").append(
										"<abbr title='" + obj.time
												+ "'><div class='frnd1' id='"
												+ msgId + "'>" + mesg
												+ "</div></abbr>");
								$("#" + (msgId - 1)).animate({
									borderBottomLeftRadius : "5px"
								});
							} else {
								$("#group").append(
										"<abbr title='" + obj.time
												+ "'><div class='frnd' id='"
												+ msgId + "'>" + mesg
												+ "</div></abbr>");
							}
							if (v != null) {
								msgId++;
								$("#group")
										.append(
												"<abbr title='"
														+ obj.time
														+ "'><div class='frnd1' id='"
														+ msgId
														+ "'><iframe width=\"480\" height=\"300\" "
														+ "src=\"https://www.youtube.com/embed/"
														+ v
														+ "\"></iframe></div></abbr>");
								$("#" + (msgId - 1)).css(
										"border-bottom-right-radius", "5px");
							}
						} else {
							$("#group").append(
									"<abbr title='" + obj.time
											+ "'><div class='frn1_emoji' id='"
											+ msgId + "'>" + msg1
											+ "</div></abbr>");
						}
						var elem = $("#group");
						var bool = elem[0].scrollHeight - elem.scrollTop() == elem
								.outerHeight();
						if (bool) {
							$('#group').animate({
								scrollTop : $('#chat').prop("scrollHeight")
							}, 500);
						}
						lastMsg = obj.name;
					}
				} else {
					$("#notification").html(obj.name + " sent you a message.");
					$("#notification").slideDown(200);
					setTimeout(slideUpNotification, 3500);
					$("#alert_chat").fadeIn(500);
				}
			}

			$(".me").css("background-color", colr);
			$(".me1").css("background-color", colr);
		};
		groupChat.onclose = function(message) {
		};
		groupChat.onerror = function(message) {
			alert("groupChat error!");
		};
		chat = new WebSocket(h + "chat");
		chat.onopen = function(message) {
		};
		chat.onmessage = function(evt) {
			var msg = evt.data;
			if (msg.startsWith("`")) {
				msg = msg.substring(1);
				userName = msg;
				$
						.post(
								"/Gibber/GetGroups",
								{
									name : userName
								},
								function(data, status) {
									var obj = $.parseJSON(data), l;
									var groups = Object.keys(obj.gMembers);
									var i = 0;
									$("#groups").html("");
									for (; i < groups.length; i++) {
										$("#groups")
												.append(
														"<div class='group' onclick='javascript:clickGroup(\""
																+ groups[i]
																+ "\")' id='g_"
																+ groups[i]
																+ "'><div class='profile'><img class='frndProfImg' src='/Gibber/GroupPic?name="
																+ groups[i]
																+ ".png'></div><div class='grp_name'>"
																+ i
																+ "</div><div class='prvw'><div class='msg_preview' id='prvw_"
																+ groups[i]
																+ "'> Last msg </div></div></div>");
										$("#g_" + groups[i]).hover(function() {
											$(this).animate({
												backgroundColor : '#f2f2f2'
											}, 100);
										}, function() {
											$(this).animate({
												backgroundColor : 'none'
											}, 100);
										});
									}
								});
				$("#profile").prepend(
						"<div id='profRe'><img id='profImg' src='/Gibber/ProfliePic?name="
								+ userName + ".png'></div><div id='na'>"
								+ userName + "</div>");

			} else if (msg.startsWith("~")) {
				msg = msg.substring(1);
				if (msg.toLowerCase() === friend.toLowerCase()) {
					if (!typing) {
						typing = true;
						var elem = $("#chat");
						var bool = elem[0].scrollHeight - elem.scrollTop() == elem
								.outerHeight();
						$("#chat")
								.append(
										"<div class='frnd1' id='typing'><img src='images/dot.gif' id='dot'></div>");
						var height = $('#chat').prop("scrollHeight");
						if (bool) {
							$('#chat').animate({
								scrollTop : height
							}, 500);
						}
						setTimeout(typingOver, 3000);
					}
				}
			} else {
				var obj = $.parseJSON(msg);
				var mesg = obj.message;
				var temp = mesg;
				if (mesg.length > 20) {
					temp = mesg.substring(0, 20) + "...";
				}

				temp = temp.replace("<", "<span><</span>");
				temp = $.trim(temp);
				if (obj.name === friend) {
					$("#typing").remove();
					if (obj.friend) {
						$("#prvw_" + obj.name).html(temp);
					} else {
						$("#prvw_" + obj.name).html("You : " + temp);
					}
					if (obj.date !== lastDate) {
						lastMsg = "None";
						lastDate = obj.date;
						var today = new Date();
						var dd = today.getDate();
						var mm = today.getMonth() + 1;
						var yyyy = today.getFullYear();

						if (dd < 10) {
							dd = '0' + dd;
						}
						var day = dateFormat(dd + '.' + mm + '.' + yyyy);
						if (dateFormat(obj.date) === day) {
							$("#chat").append("<div class='date'>Today</div>");
						} else {
							$("#chat").append(
									"<div class='date'>" + dateFormat(obj.date)
											+ "</div>");
						}
					}

					if (mesg.includes("<")) {
						var res = mesg.split("<");
						mesg = "";
						var j;
						for (j = 0; j < res.length - 1; j++) {
							mesg += res[j] + "<span><</span>";
						}
						mesg += res[res.length - 1];
					}
					if (mesg.includes("\n")) {
						var res = mesg.split("\n");
						mesg = "";
						var j;
						for (j = 0; j < res.length; j++) {
							mesg += res[j] + "<br>";
						}
					}

					var sp = mesg.split(" ");
					var k;
					var link = true;
					mesg = "";
					var v = null;
					for (k = 0; k < sp.length; k++) {
						var urlRE = new RegExp(
								"([a-zA-Z0-9]+://)?([a-zA-Z0-9_]+:[a-zA-Z0-9_]+@)?([a-zA-Z0-9.-]+\\.[A-Za-z]{2,4})(:[0-9]+)?([^ ])+");
						var check = sp[k].match(urlRE);
						if (check !== null) {
							link = false;
							mesg += " <a href='" + check[0]
									+ "' target='_blank'>" + check[3] + "</a> ";
							if (check[3].includes(".youtube.")) {
								v = getAllUrlParams(check[0]).v;
							}
						} else {
							mesg += sp[k] + " ";
						}
					}
					if (link) {
						if (mesg.includes("*")) {
							mesg = msgSplit("*", "b", mesg);
						}
						if (mesg.includes("_")) {
							mesg = msgSplit("_", "i", mesg);
						}
						if (mesg.includes("-")) {
							mesg = msgSplit("-", "strike", mesg);
						}
					}

					msgId++;
					var msg1 = obj.message;
					if (!obj.friend) {
						var chk = true;
						if (msg1 === "😮" || msg1 === "😯") {
							msg1 = "<img class='me_emoji' src='emoji/13.gif'>";
							chk = false;
						} else if (msg1 === "🙂") {
							msg1 = "<img class='me_emoji' src='emoji/1.gif'>";
							chk = false;
						} else if (msg1 === "😍") {
							msg1 = "<img class='me_emoji' src='emoji/2.gif'>";
							chk = false;
						} else if (msg1 === "😜") {
							msg1 = "<img class='me_emoji' src='emoji/3.gif'>";
							chk = false;
						} else if (msg1 === "❤️") {
							msg1 = "<img class='me_emoji' src='emoji/4.gif'>";
							chk = false;
						} else if (msg1 === "😝️") {
							msg1 = "<img class='me_emoji' src='emoji/5.gif'>";
							chk = false;
						} else if (msg1 === "😐️") {
							msg1 = "<img class='me_emoji' src='emoji/6.gif'>";
							chk = false;
						} else if (msg1 === "😉") {
							msg1 = "<img class='me_emoji' src='emoji/7.gif'>";
							chk = false;
						} else if (msg1 === "👋") {
							msg1 = "<img class='me_emoji' src='emoji/8.gif'>";
							chk = false;
						} else if (msg1 === "💔") {
							msg1 = "<img class='me_emoji' src='emoji/9.gif'>";
							chk = false;
						} else if (msg1 === "🤤") {
							msg1 = "<img class='me_emoji' src='emoji/10.gif'>";
							chk = false;
						} else if (msg1 === "🙁") {
							msg1 = "<img class='me_emoji' src='emoji/11.gif'>";
							chk = false;
						} else if (msg1 === "😥") {
							msg1 = "<img class='me_emoji' src='emoji/12.gif'>";
							chk = false;
						} else if (msg1 === "😨") {
							msg1 = "<img class='me_emoji' src='emoji/14.gif'>";
							chk = false;
						} else if (msg1 === "😏") {
							msg1 = "<img class='me_emoji' src='emoji/15.gif'>";
							chk = false;
						} else if (msg1 === "😡") {
							msg1 = "<img class='me_emoji' src='emoji/16.gif'>";
							chk = false;
						} else if (msg1 === "😕") {
							msg1 = "<img class='me_emoji' src='emoji/17.gif'>";
							chk = false;
						} else if (msg1 === "😎") {
							msg1 = "<img class='me_emoji' src='emoji/18.gif'>";
							chk = false;
						} else if (msg1 === "💓") {
							msg1 = "<img class='me_emoji' src='emoji/19.gif'>";
							chk = false;
						}
						if (chk) {
							if (lastMsg === "me") {
								$("#chat").append(
										"<abbr title='" + obj.time
												+ "'><div class='me1' id='"
												+ msgId + "'>" + mesg
												+ "</div></abbr>");
								$("#" + (msgId - 1)).animate({
									borderBottomRightRadius : "5px"
								});
							} else {
								$("#chat").append(
										"<abbr title='" + obj.time
												+ "'><div class='me' id='"
												+ msgId + "'>" + mesg
												+ "</div></abbr>");
							}
							if (v != null) {

								msgId++;
								$("#chat")
										.append(
												"<abbr title='"
														+ obj.time
														+ "'><div class='me1' id='"
														+ msgId
														+ "'><iframe width=\"480\" height=\"300\" "
														+ "src=\"https://www.youtube.com/embed/"
														+ v
														+ "\"></iframe></div></abbr>");
								$("#" + (msgId - 1)).css(
										"border-bottom-right-radius", "5px");
							}
						} else {
							$("#chat").append(
									"<abbr title='" + obj.time
											+ "'><div class='me1_emo' id='"
											+ msgId + "'>" + msg1
											+ "</div></abbr>");
						}
						$('#chat').animate({
							scrollTop : $('#chat').prop("scrollHeight")
						}, 500);
						lastMsg = "me";
					} else {
						var chk = true;
						if (msg1 === "😮" || msg1 === "😯") {
							msg1 = "<img class='me_emoji' src='emoji/13.gif'>";
							chk = false;
						} else if (msg1 === "🙂") {
							msg1 = "<img class='me_emoji' src='emoji/1.gif'>";
							chk = false;
						} else if (msg1 === "😍") {
							msg1 = "<img class='me_emoji' src='emoji/2.gif'>";
							chk = false;
						} else if (msg1 === "😜") {
							msg1 = "<img class='me_emoji' src='emoji/3.gif'>";
							chk = false;
						} else if (msg1 === "❤️") {
							msg1 = "<img class='me_emoji' src='emoji/4.gif'>";
							chk = false;
						} else if (msg1 === "😝️") {
							msg1 = "<img class='me_emoji' src='emoji/5.gif'>";
							chk = false;
						} else if (msg1 === "😐️") {
							msg1 = "<img class='me_emoji' src='emoji/6.gif'>";
							chk = false;
						} else if (msg1 === "😉") {
							msg1 = "<img class='me_emoji' src='emoji/7.gif'>";
							chk = false;
						} else if (msg1 === "👋") {
							msg1 = "<img class='me_emoji' src='emoji/8.gif'>";
							chk = false;
						} else if (msg1 === "💔") {
							msg1 = "<img class='me_emoji' src='emoji/9.gif'>";
							chk = false;
						} else if (msg1 === "🤤") {
							msg1 = "<img class='me_emoji' src='emoji/10.gif'>";
							chk = false;
						} else if (msg1 === "🙁") {
							msg1 = "<img class='me_emoji' src='emoji/11.gif'>";
							chk = false;
						} else if (msg1 === "😥") {
							msg1 = "<img class='me_emoji' src='emoji/12.gif'>";
							chk = false;
						} else if (msg1 === "😨") {
							msg1 = "<img class='me_emoji' src='emoji/14.gif'>";
							chk = false;
						} else if (msg1 === "😏") {
							msg1 = "<img class='me_emoji' src='emoji/15.gif'>";
							chk = false;
						} else if (msg1 === "😡") {
							msg1 = "<img class='me_emoji' src='emoji/16.gif'>";
							chk = false;
						} else if (msg1 === "😕") {
							msg1 = "<img class='me_emoji' src='emoji/17.gif'>";
							chk = false;
						} else if (msg1 === "😎") {
							msg1 = "<img class='me_emoji' src='emoji/18.gif'>";
							chk = false;
						} else if (msg1 === "💓") {
							msg1 = "<img class='me_emoji' src='emoji/19.gif'>";
							chk = false;
						}
						if (chk) {

							if (lastMsg === "frnd") {
								$("#chat").append(
										"<abbr title='" + obj.time
												+ "'><div class='frnd1' id='"
												+ msgId + "'>" + mesg
												+ "</div></abbr>");
								$("#" + (msgId - 1)).animate({
									borderBottomLeftRadius : "5px"
								});
							} else {
								$("#chat").append(
										"<abbr title='" + obj.time
												+ "'><div class='frnd' id='"
												+ msgId + "'>" + mesg
												+ "</div></abbr>");
							}
							if (v != null) {
								msgId++;
								$("#chat")
										.append(
												"<abbr title='"
														+ obj.time
														+ "'><div class='frnd1' id='"
														+ msgId
														+ "'><iframe width=\"480\" height=\"300\" "
														+ "src=\"https://www.youtube.com/embed/"
														+ v
														+ "\"></iframe></div></abbr>");
								$("#" + (msgId - 1)).css(
										"border-bottom-right-radius", "5px");
							}
						} else {
							$("#chat").append(
									"<abbr title='" + obj.time
											+ "'><div class='frn1_emoji' id='"
											+ msgId + "'>" + msg1
											+ "</div></abbr>");
						}
						var elem = $("#chat");
						var bool = elem[0].scrollHeight - elem.scrollTop() == elem
								.outerHeight();
						if (bool) {
							$('#chat').animate({
								scrollTop : $('#chat').prop("scrollHeight")
							}, 500);
						}
						lastMsg = "frnd";
					}
				} else {
					$("#notification").html(obj.name + " sent you a message.");
					if (obj.friend) {
						$("#prvw_" + obj.name).html(temp);
					} else {
						$("#prvw_" + obj.name).html("You : " + temp);
					}
					$("#notification").slideDown(200);
					setTimeout(slideUpNotification, 3500);
					$("#alert_chat").fadeIn(500);
				}
			}

			$(".me").css("background-color", colr);
			$(".me1").css("background-color", colr);
		};
		chat.onclose = function(message) {
		};
		chat.onerror = function(message) {
			alert("An error!");
		};

		chtFrnds = new WebSocket(h + "chat_frnds");
		chtFrnds.onopen = function(message) {
		};

		chtFrnds.onmessage = function(evt) {
			var msg = evt.data;
			var obj = $.parseJSON(msg);
			var i;
			if (obj[0]) {
				$("#alert_frnd_rqust").fadeIn(100);
			}
			$("#frnd_list").html("");
			if (obj.length == 2) {
				$("#frnd_list")
						.html(
								"<div id='no_friends'>You don't have any friend..<br>Try finding some friends from <u>Find Friends</u>.</div>"
										+ "<img id='arrow' src='images/arrow.png'> <div id='li'><br></div><img id='arrow1' src='images/arrow1.png'>");
			}
			if (obj[obj.length - 1] == null) {
				colr = "#31cef3";
			} else {
				colr = obj[obj.length - 1];
			}
			for (i = 1; i < obj.length - 1; i++) {
				var lastMsg = obj[i].lastMsg;
				if (lastMsg.includes("<")) {
					var res = lastMsg.split("<");
					lastMsg = "";
					var j;
					for (j = 0; j < res.length - 1; j++) {
						lastMsg += res[j] + "<span><</span>";
					}
					lastMsg += res[res.length - 1];
				}
				lastMsg = $.trim(lastMsg);
				$("#frnd_list")
						.append(
								"<div class='friends' onclick='javascript:clickFriend(\""
										+ obj[i].name
										+ "\")' id='f_"
										+ obj[i].name
										+ "'><div class='profile'><img class='frndProfImg'src='/Gibber/ProfliePic?name="
										+ obj[i].name
										+ ".png'></div><div class='frnd_name'>"
										+ obj[i].name
										+ "</div><div class='prvw'><div class='msg_preview' id='prvw_"
										+ obj[i].name + "'>" + lastMsg
										+ "</div></div></div>");
				$("#f_" + obj[i].name).hover(function() {
					$(this).animate({
						backgroundColor : '#f2f2f2'
					}, 100);
				}, function() {
					$(this).animate({
						backgroundColor : 'none'
					}, 100);
				});
			}

		};
		chtFrnds.onclose = function(message) {
		};
		chtFrnds.onerror = function(message) {
			alert("An error!");
		};

		findFrnd = new WebSocket(h + "find_friend");
		findFrnd.onopen = function(message) {
		};
		findFrnd.onmessage = function(evt) {
			var msg = evt.data;
			if (msg.startsWith("You recieved a friend request")) {
				$("#alert_frnd_rqust").fadeIn(100);
			}
			$("#notification").html(msg);
			$("#notification").slideDown(200);
			setTimeout(slideUpNotification, 3500);
		};
		findFrnd.onclose = function(message) {
		};
		findFrnd.onerror = function(message) {
			alert("An error!");
		};

		frndRqst = new WebSocket(h + "friend_requests");
		frndRqst.onopen = function(message) {
		};
		frndRqst.onmessage = function(evt) {
			var msg = evt.data;
			var obj = $.parseJSON(msg);
			var i;
			$("#frnd_rqsts").html("");
			if (obj.length == 0) {
				$("#frnd_rqsts")
						.html(
								"<div id='no_friends'>You don't have any friend request..<br>Try finding some friends from <u>Find Friends</u>.</div>"
										+ "<img id='arrow' src='images/arrow.png'> <div id='li'><br></div><img id='arrow1' src='images/arrow1.png'>");
			}
			for (i = 0; i < obj.length; i++) {
				$("#frnd_rqsts")
						.append(
								"<div class='frnd_requests' id='r_"
										+ obj[i]
										+ "'><div class='profile'><img class='frndProfImg'src='/Gibber/ProfliePic?name="
										+ obj[i]
										+ ".png'></div><div class='name'>"
										+ obj[i]
										+ "</div><div class='accept' onclick='javascript:acceptFrnd(\""
										+ obj[i]
										+ "\")'>Accept</div><div class='reject' onclick='javascript:rejectFrnd(\""
										+ obj[i]
										+ "\")'>Reject</div><hr></div><br>");
			}
		};
		frndRqst.onclose = function(message) {
		};
		frndRqst.onerror = function(message) {
			alert("An error!");
		};

		frndRqstStatus = new WebSocket(h + "frnd_request_status");
		frndRqstStatus.onopen = function(message) {
		};
		frndRqstStatus.onmessage = function(evt) {
			var msg = evt.data;
			var obj = $.parseJSON(msg);
			if (obj.status === "friend_accepted") {
				$("#notification").html(
						obj.name + " accepted your friend request");
				$("#alert_chat").fadeIn(100);
				$("#notification").slideDown(200);
				setTimeout(slideUpNotification, 3500);
				chtFrnds.send("");
			} else if (obj.status === "you_rejected") {
				$("#r_" + obj.name).fadeOut(300);
				$("#notification").html(
						"You rejected " + obj.name + "'s friend request");
				$("#notification").slideDown(200);
				setTimeout(slideUpNotification, 3500);
			} else {
				$("#r_" + obj.name).slideUp(300);
				$("#notification").html(
						"You accepted " + obj.name + "'s friend request");
				$("#notification").slideDown(200);
				$("#alert_chat").fadeIn(100);
				setTimeout(slideUpNotification, 3500);
			}

		};
		frndRqstStatus.onclose = function(message) {
		};
		frndRqstStatus.onerror = function(message) {
			alert("An error!");
		};
	}

	$("#submitMsg").click(function() {
		sendMessage();
	});

	$("#frd").click(function() {
		$("#title1").html("Find Friend");
		$("#groups").fadeOut(100);
		$("#frnd_rqsts").fadeOut(100);
		$("#frnd_list").fadeOut(100);
		$("#find_frnd").fadeIn(100);
		$("#findFrndTextBox").focus();
	});

	$("#grp").click(
			function() {
				$("#title1").html(
						"Groups<img id='createImg' src='images/addChat.png'>");
				$("#find_frnd").fadeOut(100);
				$("#createImg").click(function() {
					$("#create_group").toggle(100);
					$("#arrow_up").toggle(100);
				});
				$("#frnd_rqsts").fadeOut(100);
				$("#frnd_list").fadeOut(100);
				$("#alert_group").fadeOut(100);
				$("#groups").fadeIn(100);
			});

	$("#cht").click(function() {
		chtFrnds.send("");
		$("#title1").html("Friends");
		$("#groups").fadeOut(100);
		$("#find_frnd").fadeOut(100);
		$("#frnd_rqsts").fadeOut(100);
		$("#alert_chat").fadeOut(100);
		$("#frnd_list").fadeIn(100);
	});
	$("#notfi").click(function() {
		$("#title1").html("Friend Requests");
		$("#groups").fadeOut(100);
		$("#frnd_list").fadeOut(100);
		$("#find_frnd").fadeOut(100);
		$("#frnd_rqsts").fadeIn(100);
		$("#alert_frnd_rqust").fadeOut(100);
		friendRequests();
	});

}
function slideUpNotification() {
	$("#notification").slideUp(200);
}
function acceptFrnd(name) {
	var myObj = {};
	myObj["status"] = "accepted";
	myObj["name"] = name;
	var json = JSON.stringify(myObj);
	frndRqstStatus.send(json);

}
function rejectFrnd(name) {
	var myObj = {};
	myObj["status"] = "rejected";
	myObj["name"] = name;
	var json = JSON.stringify(myObj);
	frndRqstStatus.send(json);
}
function slideUpNotification() {
	$("#notification").slideUp(200);
}

function friendRequests() {
	frndRqst.send("");
}

var las = true;
var photoboo = false;
var isMic = false;
function design() {
	$("#logout").hide();
	$("#change_pass").hide();
	$("#create_group").hide();
	$("#arrow_up").hide();
	$("#set").hide();
	$("#colour_selection").hide();
	$("#upload").hide();
	$("#find_frnd").hide();
	$("#frnd_rqsts").hide();
	$("#groups").hide();
	$("#uploadBox").hide();
	$("#notification").hide();
	$("#composer").hide();
	$("#alert_chat").hide();
	$("#alert_frnd_rqust").hide();
	$("#alert_group").hide();
	$('textarea').keydown(function(evt) {
		if (evt.charCode == 13 || evt.keyCode == 13) {
			if (evt.shiftKey) {
				return true;
			} else {
				$('form').submit();
				return false;
			}
		}
	});
	$("#createImg").click(function() {
		$("#create_group").toggle(100);
	});
	$("img", ".me_emoji").hover(function() {
		$('.me_emoji').toggle();
	});
	$("#set").click(function() {
		$("#change_pass").animate({
			width : 'toggle'
		}, 200);
	});
	$("#close1").click(function() {
		$('#change_pass').slideUp(200);
	});
	$("#colour").click(function() {
		$('#colour_selection').slideDown(100);
	});
	$("#colour_selection").click(function() {
		$('#colour_selection').slideUp(100);
	});

	$("#clr1").click(function() {
		colr = "#31cef3";
		chat.send("¬" + userName + "," + colr);
		$(".me").css("background-color", colr);
		$(".me1").css("background-color", colr);
	});

	$("#clr2").click(function() {
		colr = "#855dd5";
		chat.send("¬" + userName + "," + colr);
		$(".me").css("background-color", colr);
		$(".me1").css("background-color", colr);
	});

	$("#clr3").click(function() {
		colr = "#28C974";
		chat.send("¬" + userName + "," + colr);
		$(".me").css("background-color", colr);
		$(".me1").css("background-color", colr);
	});

	$("#clr4").click(function() {
		colr = "#DD96CF";
		chat.send("¬" + userName + "," + colr);
		$(".me").css("background-color", colr);
		$(".me1").css("background-color", colr);
	});

	$("#clr5").click(function() {
		colr = "#ff3333";
		chat.send("¬" + userName + "," + colr);
		$(".me").css("background-color", colr);
		$(".me1").css("background-color", colr);
	});

	$("#clr6").click(function() {
		colr = "#262626";
		chat.send("¬" + userName + "," + colr);
		$(".me").css("background-color", colr);
		$(".me1").css("background-color", colr);
	});

	$("#cl").click(function() {
		photoboo = false;
		$('#uploadBox').slideUp(300);
	});
	$('#close').hide();
	$("#profile").click(function() {
		if (las) {
			las = false;
			$("#profile").animate({
				width : "300px",
				height : "130px",
				borderRadius : "5px",
				borderTopLeftRadius : "10px",
				borderBottomLeftRadius : "10px"
			}, 200);
			$("#profImg").animate({
				borderRadius : "0px",
				borderTopLeftRadius : "10px",
				height : "100px",
				width : "100px"
			}, 200);
			$("#na").fadeIn(500);
			$("#set").fadeIn(500);
			$("#logout").show();
			$("#upload").show();
		} else {
			las = true;
			$("#profile").animate({
				width : "40px",
				height : "40px",
				borderRadius : "100px"
			}, 200);
			$("#profImg").animate({
				borderRadius : "100px",
				height : "40px",
				width : "40px"
			}, 200);
			$("#na").hide();
			$("#set").hide();
			$("#logout").hide();
			$("#upload").hide();
		}
	});
	$('#upload').click(function() {
		photoboo = false;
		$("#slct_mic").hide();
		$("#slct").show();
	});
	$('#close').click(function() {
		$('#profile').animate({
			width : '40px',
			height : '40px',
			borderRadius : '10px'
		}, 200);
		$('#close').fadeOut(200);
	});

	$('#pic').click(function() {
		photoboo = true;
		$("#slct_mic").hide();
		$("#slct").show();
		isMic = false;
		uploadBox();

	});

	$('#mic').click(function() {
		photoboo = true;
		$("#slct").hide();
		$("#slct_mic").show();
		isMic = true;
		uploadBox();
	});

	$("#cht").hover(function() {
		$('#cht').attr('src', 'images/chat1.png');
	}, function() {
		$('#cht').attr('src', 'images/chat.png');
	});
	$("#pic").hover(function() {
		$('#pic').attr('src', 'images/pic2.png');
	}, function() {
		$('#pic').attr('src', 'images/pic1.png');
	});
	$("#mic").hover(function() {
		$('#mic').attr('src', 'images/mic2.png');
	}, function() {
		$('#mic').attr('src', 'images/mic1.png');
	});
	$("#submitMsg").hover(function() {
		$('#submitMsg').attr('src', 'images/Send.png');
	}, function() {
		$('#submitMsg').attr('src', 'images/Send1.png');
	});
	$("#frd").hover(function() {
		$('#frd').attr('src', 'images/findFriend1.png');
	}, function() {
		$('#frd').attr('src', 'images/findFriend.png');
	});
	$("#notfi").hover(function() {
		$('#notfi').attr('src', 'images/addFrnd1.png');
	}, function() {
		$('#notfi').attr('src', 'images/addFrnd.png');
	});
	$('#ok').click(function() {
		createGroup();
		$("#create_group").toggle(100);
		$("#arrow_up").toggle(100);
	});
}

function findFriend() {
	var name = $("#findFrndTextBox").val();
	if (name !== "") {
		findFrnd.send(name);
		$("#findFrndTextBox").val("");
	}
}

function createGroup() {

	var json = JSON.stringify(participants);
	$.post("/Gibber/CreateGroup", {
		ppl : json,
		name : userName
	}, function(data, status) {

	});
}

function uploadBox() {
	var obj = $(".drop");
	$('#prof').hide();
	$('#uploadBox').slideDown(300);
	$("#filedrag").html("Drop the file here");
	obj.css("border", "2px dotted grey");
	obj.on("dragover", function(e) {
		e.stopPropagation();
		e.preventDefault();
		$(this).css("border", "1px solid #666666");
	});
	obj.on("dragleave", function(e) {
		$(this).css("border", "2px dotted #383838");
	});
	obj.on("drop", function(e) {
		e.stopPropagation();
		e.preventDefault();
		$(this).css("border", "1px solid #e6e6e6");
		$("#filedrag").html("");
		$("#slct").hide();
		$("#upld").fadeIn(500);
		var dt = e.originalEvent.dataTransfer;
		var files = dt.files;
		f2.files = dt.files;
		if (dt.files.length > 0) {
			if (dt.files && dt.files[0]) {
				var reader = new FileReader();
				reader.onload = function(e) {
					$('#prof').attr('src', e.target.result).width(340);
					$('#prof').fadeIn();
				};
				reader.readAsDataURL(dt.files[0]);
			}
		}

	});
}
function sendFile(fil) {
	var file = null;
	if (fil) {
		if (isMic) {
			file = document.getElementById('audio').files[0];
		} else {
			file = document.getElementById('filename').files[0];
		}
	} else {
		file = document.getElementById('f2').files[0];
	}
	if (photoboo) {
		if (isMic) {
			uploadAudio.send("start," + friend);
		} else {
			uploadPic.send("start," + friend);
		}
		var reader = new FileReader();
		var rawData = new ArrayBuffer();
		reader.loadend = function() {
		}
		reader.onload = function(e) {
			rawData = e.target.result;
			if (isMic) {
				uploadAudio.send(rawData);
			} else {
				uploadPic.send(rawData);
			}
		}
		reader.readAsArrayBuffer(file);
	} else {
		ppUpload.send("filename:" + file.name);
		var reader = new FileReader();
		var rawData = new ArrayBuffer();
		reader.loadend = function() {

		}
		reader.onload = function(e) {
			rawData = e.target.result;
			ppUpload.send(rawData);
			ppUpload.send('end');
		}
		reader.readAsArrayBuffer(file);
	}
	refreshUpBox();
	$("#uploadBox").slideUp(500);
}
function refreshUpBox() {
	document.getElementById("filename").value = "";
	document.getElementById("f2").value = "";
	$("#slct").show();
	$("#upld").show();
	$(".drop").css("border", "2px dotted grey");
}