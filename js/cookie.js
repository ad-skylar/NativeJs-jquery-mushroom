var Cookie={
			    "setCookie":function(key,value,_path,_date){
			        document.cookie=key+"="+value+";path="+_path+";expires="+_date+";";
			    },
			    "deleteCookie":function(key,_path){
			        document.cookie=key+"=;path="+_path+";"+"expires="+new Date("1970-01-01")+";";
			    },
			    "readCookie":function(){
			    	return document.cookie;
			    }
			}
