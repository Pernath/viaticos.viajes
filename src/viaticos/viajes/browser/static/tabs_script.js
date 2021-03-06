function coloring(){
    $("td").each(
	function(){
	    var texto = $(this).text();
	    if(texto.includes("borrador")){
		$(this).attr("style", "color:red;");
	    }
	    else if(texto.includes("revision aprobador") || texto.includes("bosquejo") || texto.includes("registro por verificar")){
		$(this).attr("style", "color:#eb6123;");
	    }
	    else if(texto.includes("esperando agencia") || texto.includes("revision finanzas") || texto.includes("revision implant")){
		$(this).attr("style", "color:blue;");
	    }
	    else if(texto.includes("anticipo pendiente")){
		$(this).attr("style", "color:green;");
	    }
	    else if(texto.includes("transferencia en proceso")){
		$(this).attr("style", "color:#32a8a0;");
	    }
	});
}

var waitForEl = function(selector, callback) {
    if (jQuery(selector).length) {
	callback();
    } else {
	setTimeout(function() {
	    waitForEl(selector, callback);
	}, 100);
    }
};

$(window).load(function(){
    //hiding hideous elements
    if(!$("body").hasClass("userrole-manager")){
	waitForEl("#plone-contentmenu-actions", function() {
	    // work the magic
	    $("#plone-contentmenu-actions").hide();
	});
	waitForEl("#contentview-folderContents", function() {
	    $("#contentview-folderContents").remove();
	});
    }
    $("#viewlet-below-content").hide();
    coloring();
    
    var tabs = document.getElementById('icetab-container').children;
    var tabcontents = document.getElementById('icetab-content').children;
    $("#icetab-content").css("height","100%");//(($(".tab-active tr").length+4)*2)+"em");

    var myFunction = function() {
	var tabchange = this.mynum;
	for(var int=0;int<tabcontents.length;int++){
	    tabcontents[int].className = ' tabcontent';
	    tabs[int].className = ' icetab';
	}
	tabcontents[tabchange].classList.add('tab-active');
	this.classList.add('current-tab');
	$("#icetab-content").css("height","100%");//(($(".tab-active tr").length+4)*2.2)+"em");
    }	


    for(var index=0;index<tabs.length;index++){
	tabs[index].mynum=index;
	tabs[index].addEventListener('click', myFunction, false);
    }
})
