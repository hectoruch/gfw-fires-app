/*! Global-Forest-Watch-Fires Thu Nov 20 2014 12:06:49 */
define(["dojo/dom","dojo/_base/array","dijit/registry","dojo/Deferred","dijit/layout/AccordionContainer","dijit/layout/ContentPane","dijit/form/HorizontalSlider","dijit/form/CheckBox","dijit/form/RadioButton"],function(a,b,c,d,e,f,g,h,i){return{buildFromJSON:function(a){var c;switch(a.type){case"accordion":c=new e(a.props,a.id),a.hasOwnProperty("children")&&b.forEach(a.children,function(a){c.addChild(new f(a.props,a.id))}),c.startup(),c.resize();break;case"contentpane":c=new f(a.props,a.id);break;case"horizontal-slider":c=new g(a.props,a.id);break;case"radio":c=new i(a.props,a.id);break;case"checkbox":c=new h(a.props,a.id)}},buildDijits:function(a){var c=this;b.forEach(a,function(a){c.buildFromJSON(a)})}}});