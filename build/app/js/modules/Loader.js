/*! Global-Forest-Watch-Fires Fri Dec 12 2014 09:16:49 */
define(["esri/tasks/query","esri/tasks/QueryTask"],function(Query,QueryTask){var o={};return o.query=function(props){var layer=props.layer,where=props.where||"1=1",returnGeometry=props.returnGeometry||!1,outFields=props.outFields||["*"],type=props.type||"execute",queryTask=new QueryTask(layer),query=new Query;query.where=where,query.returnGeometry=returnGeometry,query.outFields=outFields,query.getCount;var deferred=eval("queryTask."+type+"(query)");return deferred},o});