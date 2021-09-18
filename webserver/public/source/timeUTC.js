function getUTCtime(format){
                            var f;
                            var t = new Date();
                            var h = callibrateZero(t.getUTCHours());
                            var m = callibrateZero(t.getUTCMinutes());
                            var s = callibrateZero(t.getUTCSeconds());
                            if (format==undefined){
                                                    f=h.toString()+m.toString();
                            }
                            else { 
                                  f=h.toString()+':'+m.toString()+':'+s.toString();
                            }
                            return f;
}

function callibrateZero(t){  
                            if (t < 10) {
                                          t="0"+t;
                            }
                            return t;
}

function getUTCdateICAO(format){
                                var s;
                                var t = new Date();
                                var d = callibrateZero(t.getUTCDate());
                                var m = callibrateZero(t.getUTCMonth()+1); //months are zero indexed!!  so I added 1  to months
                                var y = t.getUTCFullYear();
                                y=y.toString().substring(2,4);  // truncate years to get last two digits for ICAO format
                                if (format==undefined){ 
                                                        s=y.toString()+m.toString()+d.toString();  
                                }
                                else {
                                      s=y.toString()+'-'+m.toString()+'-'+ d.toString();
                                }
                                return s; 
}