
'use strict';

//symmetric decryption key and IV from SCS
module.exports.shared_key = new Buffer('symmetric encryption key here', 'binary');
module.exports.iv = new Buffer('8 byte IV here', 'binary');

//mongodb collection url
module.exports.mongourl = 'mongodb://localhost:27017/vote-record';

//HTML template for ballot in sendable/manipulatable form
//Yes it's gross sorry (no time to add templating engine)
module.exports.ballotTemplate = '<!docType html>' +
'<html>' +
'<head>' +
'<style>' +
'@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,300);' +
'@import url(https://fonts.googleapis.com/css?family=Open+SanCondensed:300,700);' +
'body{' +
'font-family:\'OpenSans\',sans-serif;' +
'position:relative;' +
'background:#191919;' +
'color:#cccccc;' +
'}' +
'h1,h2{' +
'font-family:\'OpenSansCondensed\',sans-serif;' +
'font-weight:300;' +
'color:#9b1d06;' +
'text-align:center;' +
'}' +
'h2{' +
'text-align:left;' +
'text-decoration:underline;' +
'}' +
'a{' +
'text-decoration:none;' +
'color:#676767;' +
'}' +
'a:link,a:visited{' +
'color:#676767;' +
'}' +
'a:hover,a:active{' +
'color:#9b1d06;' +
'}' +
'h3{' +
'margin-bottom:0px;' +
'}' +
'ul{' +
'margin:20px auto;' +
'margin-top:6px;' +
'}' +
'select{' +
'margin-bottom: 2em;' +
'}' +
'label{' +
'color: #9b1d06;' +
'}' +
'button{' +
'display: block;' +
'margin-top: 10px;' +
'width: 100px;' +
'height: 40px;' +
'font-size: 30px;' +
'background: #fb1d06;' +
'font-weight: bold;' +
'}' +
'.content{' +
'width:80%;' +
'margin:0 auto;' +
'}' +
'.alert{' +
'color:#ff1d06;' +
'font-size:0.9em;' +
'}' +
'a.vote{' +
'color:#9b1d06;' +
'font-size:2.5em;' +
'}' +
'a.vote:link,a.vote:visited{' +
'color:#9b1d06;' +
'}' +
'a.vote:hover,a.vote:active{' +
'color:#676767;' +
'}' +
'.position{' +
'}' +
'</style>' +
'</head>' +
'<body>' +
'<div class="content">' +
'' +
'<h1>CCSS Ballot 2015/2016</h1>' +
'' +
'<h2>Directions</h2>' +
'' +
'<p>This is a direct vote ballot, meaning that for each position available for' +
'election you may select one (1) candidate, zero (0) candidates (also known as' +
'an \'abstain\' vote), or you may select \'No Confidence\' indicating that you' +
'believe no candidate is capable of this position. When you are ready to submit' +
'your ballot, click the \'Vote\' button at the bottom of the ballot to do so. </p>' +
'' +
'<p class=\'alert\'>ONCE YOU SUBMIT YOUR BALLOT IT CANNOT BE CHANGED</p>' +
'' +
'<form method="POST" action="ballot">' +
'<input type="hidden" name="x" value="{{x}}">' +
'' +
'<h2>Ballot</h2>' +
'' +
'<div class="position">' +
'<h3>Candidates for President</h3>' +
'<ul>' +
'<li>Elisa Kazan</li>' +
'</ul>' +
'<label for="pres">President Selection</label>' +
'<select name="pres" id="pres">' +
  '<option value="0" selected>Abstain</option>' +
  '<option value="1">Elisa Kazan</option>' +
  '<option value="99">No Confidence</option>' +
'</select>' +
'</div>' +
'' +
'<div class="position">' +
'<h3>Candidates for Vice-President</h3>' +
'<ul>' +
'<li>Jack McCracken</li>' +
'</ul>' +
'<label for="vpres">Vice-President Selection</label>' +
'<select name="vpres" id="vpres">' +
  '<option value="0" selected>Abstain</option>' +
  '<option value="1">Jack McCracken</option>' +
  '<option value="99">No Confidence</option>' +
'</select>' +
'</div>' +
'' +
'<div class="position">' +
'<h3>Candidates for Treasurer</h3>' +
'<ul>' +
'<li>Andrew Morris</li>' +
'</ul>' +
'<label for="tres">Treasurer Selection</label>' +
'<select name="tres" id="tres">' +
  '<option value="0" selected>Abstain</option>' +
  '<option value="1">Andrew Morris</option>' +
  '<option value="99">No Confidence</option>' +
'</select>' +
'</div>' +
'' +
'<div class="position">' +
'<h3>Candidates for Vice-President of Academics</h3>' +
'<ul>' +
'<li>Matt Diener</li>' +
'</ul>' +
'<label for="vpa">Vice-President of Academics Selection</label>' +
'<select name="vpa" id="vpa">' +
  '<option value="0" selected>Abstain</option>' +
  '<option value="1">Matt Diener</option>' +
  '<option value="99">No Confidence</option>' +
'</select>' +
'</div>' +
'' +
'<div class="position">' +
'<h3>Candidates for Vice-President of Social</h3>' +
'<ul>' +
'<li>Forest Anderson</li>' +
'</ul>' +
'<label for="vps">Vice-President of Social Selection</label>' +
'<select name="vps" id="vps">' +
  '<option value="0" selected>Abstain</option>' +
  '<option value="1">Forest Anderson</option>' +
  '<option value="99">No Confidence</option>' +
'</select>' +
'</div>' +
'' +
'<button>Vote</button>' +
'' +
'</form>' +
'' +
'</div>' +
'</body>' +
'</html>';
