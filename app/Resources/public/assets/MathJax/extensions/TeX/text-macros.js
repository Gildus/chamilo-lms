/*
 *  /MathJax-v2/extensions/TeX/text-macros.js
 *
 *  Copyright (c) 2009-2018 The MathJax Consortium
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

MathJax.Extension["TeX/text-macros"]={version:"2.7.8"};MathJax.Hub.Register.StartupHook("TeX Jax Ready",function(){var a=MathJax.ElementJax.mml;var d=MathJax.InputJax.TeX;var c=d.Definitions;d.Parse.Augment({InternalMath:function(f,g){var e=b(f,{}).Parse();if(g!=null){e=[a.mstyle.apply(a,e).With({displaystyle:false,scriptlevel:g})]}else{if(e.length>1){e=[a.mrow.apply(a,e)]}}return e},Comment:function(e){while(this.i<this.string.length&&this.string.charAt(this.i)!="\n"){this.i++}this.i++},GetCS:function(){var e=this.string.slice(this.i).match(/^([a-z]+|.) ?/i);if(e){this.i+=e[0].length;return e[1]}else{this.i++;return" "}}});var b=d.TextParser=d.Parse.Subclass({Init:function(f,e){this.env=MathJax.Hub.Insert({},e);this.stack={env:this.env};this.string=f;this.i=0;this.mml=[];this.text=""},textSpecial:{"\\":"ControlSequence","$":"Math","%":"Comment","^":"MathModeOnly",_:"MathModeOnly","&":"Misplaced","#":"Misplaced","~":"Tilde"," ":"Space","\t":"Space","\r":"Space","\n":"Space","\u00A0":"Tilde","{":"OpenBrace","}":"CloseBrace","`":"OpenQuote","'":"CloseQuote"},textMacros:{"(":"Math","$":"SelfQuote",_:"SelfQuote","%":"SelfQuote","{":"SelfQuote","}":"SelfQuote"," ":"SelfQuote","&":"SelfQuote","#":"SelfQuote","\\":"SelfQuote","'":["Accent","\u00B4"],"`":["Accent","\u0060"],"^":["Accent","^"],'"':["Accent","\u00A8"],"~":["Accent","~"],"=":["Accent","\u00AF"],".":["Accent","\u02D9"],u:["Accent","\u02D8"],v:["Accent","\u02C7"],emph:"Emph",rm:["SetFont",a.VARIANT.NORMAL],mit:["SetFont",a.VARIANT.ITALIC],oldstyle:["SetFont",a.VARIANT.OLDSTYLE],cal:["SetFont",a.VARIANT.CALIGRAPHIC],it:["SetFont","-tex-mathit"],bf:["SetFont",a.VARIANT.BOLD],bbFont:["SetFont",a.VARIANT.DOUBLESTRUCK],scr:["SetFont",a.VARIANT.SCRIPT],frak:["SetFont",a.VARIANT.FRAKTUR],sf:["SetFont",a.VARIANT.SANSSERIF],tt:["SetFont",a.VARIANT.MONOSPACE],tiny:["SetSize",0.5],Tiny:["SetSize",0.6],scriptsize:["SetSize",0.7],small:["SetSize",0.85],normalsize:["SetSize",1],large:["SetSize",1.2],Large:["SetSize",1.44],LARGE:["SetSize",1.73],huge:["SetSize",2.07],Huge:["SetSize",2.49],mathcal:"MathModeOnly",mathscr:"MathModeOnly",mathrm:"MathModeOnly",mathbf:"MathModeOnly",mathbb:"MathModeOnly",mathit:"MathModeOnly",mathfrak:"MathModeOnly",mathsf:"MathModeOnly",mathtt:"MathModeOnly",Bbb:["Macro","{\\bbFont #1}",1],textrm:["Macro","{\\rm #1}",1],textit:["Macro","{\\it #1}",1],textbf:["Macro","{\\bf #1}",1],textsf:["Macro","{\\sf #1}",1],texttt:["Macro","{\\tt #1}",1],dagger:["Insert","\u2020"],ddagger:["Insert","\u2021"],S:["Insert","\u00A7"]},useMathMacros:{",":true,":":true,">":true,";":true,"!":true,enspace:true,quad:true,qquad:true,thinspace:true,negthinspace:true,hskip:true,hspace:true,kern:true,mskip:true,mspace:true,mkern:true,rule:true,Rule:true,Space:true,color:true,href:true,unicode:true,ref:true,eqref:true},Parse:function(){var e;while((e=this.string.charAt(this.i++))){if(this.textSpecial.hasOwnProperty(e)){this[this.textSpecial[e]](e)}else{this.text+=e}}this.SaveText();return this.mml},ControlSequence:function(h){var f=this.GetCS(),e=h+f,g;if(this.textMacros.hasOwnProperty(f)){g=this.textMacros[f]}else{g=this.LookupCS(f);if(!g){this.Error(["UndefinedControlSequence","Undefined control sequence %1",e])}if((!(g instanceof Array)||g[0]!=="Macro")&&!this.useMathMacros.hasOwnProperty(f)){this.Error(["MathMacro","'%1' is only supported in math mode",e])}}if(g instanceof Array){if(!this.hasOwnProperty[g[0]]){this.SaveText()}this[g[0]].apply(this,[e].concat(g.slice(1)))}else{if(!this.hasOwnProperty[g]){this.SaveText()}this[g].call(this,e)}},LookupCS:function(e){if(c.macros.hasOwnProperty(e)){return c.macros[e]}if(c.mathchar0mi.hasOwnProperty(e)){return c.mathchar0mi[e]}if(c.mathchar0mo.hasOwnProperty(e)){return c.mathchar0mo[e]}if(c.mathchar7.hasOwnProperty(e)){return c.mathchar7[e]}if(c.delimiter.hasOwnProperty("\\"+e)){return c.delimiter["\\"+e]}return null},Math:function(f){this.SaveText();var g=this.i,e;var k=0,l;while((l=this.GetNext())){e=this.i++;switch(l){case"\\":var h=this.GetCS();if(h===")"){l="\\("}case"$":if(k===0&&f===l){this.Push(d.Parse(this.string.substr(g,e-g),this.env).mml());return}break;case"{":k++;break;case"}":if(k==0){this.Error(["ExtraCloseMissingOpen","Extra close brace or missing open brace"])}k--;break}}this.Error(["MathNotTerminated","Math not terminated in text box"])},MathModeOnly:function(e){this.Error(["MathModeOnly","'%1' allowed only in math mode",e])},Misplaced:function(e){this.Error(["Misplaced","'%1' can not be used here",e])},OpenBrace:function(f){var e=this.env;this.env=MathJax.Hub.Insert({},e);this.env.oldEnv=e},CloseBrace:function(e){if(this.env.oldEnv){this.SaveText();this.env=this.env.oldEnv}else{this.Error(["ExtraCloseMissingOpen","Extra close brace or missing open brace"])}},OpenQuote:function(e){if(this.string.charAt(this.i)===e){this.text+="\u201C";this.i++}else{this.text+="\u2018"}},CloseQuote:function(e){if(this.string.charAt(this.i)===e){this.text+="\u201D";this.i++}else{this.text+="\u2019"}},Tilde:function(e){this.text+="\u00A0"},Space:function(e){this.text+=" ";while(this.GetNext().match(/\s/)){this.i++}},SelfQuote:function(e){this.text+=e.substr(1)},Insert:function(e,f){this.text+=f},Accent:function(f,h){this.SaveText();var g=this.ParseArg(f);var e=a.mo(a.chars(h));if(this.env.mathvariant){e.mathvariant=this.env.mathvariant}this.Push(a.mover(g,e))},Emph:function(e){this.UseFont(e,this.env.mathvariant==="-tex-mathit"?"normal":"-tex-mathit")},UseFont:function(e,f){this.SaveText();this.Push(this.ParseTextArg(e,{mathvariant:f}))},SetFont:function(e,f){this.SaveText();this.env.mathvariant=f},SetSize:function(e,f){this.SaveText();this.env.mathsize=f},ParseTextArg:function(e,f){var g=this.GetArgument(e);f=MathJax.Hub.Insert(MathJax.Hub.Insert({},this.env),f);delete f.oldEnv;return b(g,f).Parse()},ParseArg:function(f){var e=b(this.GetArgument(f),this.env).Parse();if(e.length===0){return e[0]}return a.mrow.apply(a.mrow,e)},SaveText:function(){if(this.text){var e=a.mtext(a.chars(this.text));if(this.env.mathvariant){e.mathvariant=this.env.mathvariant}this.Push(e)}this.text=""},Push:function(e){if(e instanceof Array){if(this.env.mathsize||this.env.mathcolor){e=a.mstyle.apply(a,e);if(this.env.mathsize){e.mathsize=this.env.mathsize}if(this.env.mathcolor){e.mathcolor=this.env.mathcolor}}this.mml.push.apply(this.mml,e)}else{if(this.env.mathsize&&!e.mathsize){e.mathsize=this.env.mathsize}if(this.env.mathcolor&&!e.mathcolor){e.mathcolor=this.env.mathcolor}this.mml.push(e)}},Error:function(e){d.Error(e)}});MathJax.Hub.Startup.signal.Post("TeX text-macros Ready")});MathJax.Ajax.loadComplete("[MathJax]/extensions/TeX/text-macros.js");