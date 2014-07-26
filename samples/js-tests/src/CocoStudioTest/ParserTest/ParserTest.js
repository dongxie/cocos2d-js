/****************************************************************************
 Copyright (c) 2013-2014 Chukong Technologies Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/


var g_parsersTests = [
    {
        title: "cocostudio 1.3",
        test: function(){
            new CocostudioParserJsonScene("res/cocosui/UIEditorTest/cocostudio1_3/CocostudioV1_3_1.ExportJson").runThisTest();
        }
    },{
        title: "cocostudio 1.4",
        test: function(){
            new CocostudioParserJsonScene("res/cocosui/UIEditorTest/cocostudio1_4/Cocostudio1_4_1.ExportJson").runThisTest();
        }
    },{
        title: "cocostudio 1.5",
        test: function(){
            new CocostudioParserJsonScene("res/cocosui/UIEditorTest/cocostudio1_5/Cocostudio1_5_1.ExportJson").runThisTest();
        }
    }
];

var runParserTest = function () {
    var pScene = new CocostudioParserJsonScene();
    if (pScene) {
        pScene.runThisTest();
    }
};

var CocostudioParserJsonLayer = cc.Layer.extend({

    _jsonFile: null,

    ctor: function(jsonFile){
        this._super();
        this._jsonFile = jsonFile;
    },

    onEnter: function(){
        this._super();
        cc.Layer.prototype.onEnter.call(this);

        var guiReader = ccs.uiReader;

        guiReader.registerTypeAndCallBack("CustomImageView",
            CustomImageView,
            CustomImageViewReader,
            CustomImageViewReader.setProperties);
        guiReader.registerTypeAndCallBack("CustomParticleWidget",
            CustomParticleWidget,
            CustomParticleWidgetReader,
            CustomParticleWidgetReader.setProperties);

        var layout = guiReader.widgetFromJsonFile(this._jsonFile);
        layout.setScale(0.7);
        this.addChild(layout);
    }
});

var CocostudioParserJsonScene = cc.Scene.extend({

    _jsonFile: null,

    ctor: function(jsonFile){
        this._super();
        if(jsonFile){
            this._jsonFile = jsonFile;
        }
    },

    onEnter: function(){
        cc.Scene.prototype.onEnter.call(this);

        var label = cc.LabelTTF.create("Back", "fonts/arial.ttf", 20);
        //#endif
        var pMenuItem = cc.MenuItemLabel.create(label, this.BackCallback, this);

        var pMenu = cc.Menu.create(pMenuItem);

        pMenu.setPosition( cc.p(0, 0) );
        pMenuItem.setPosition( cc.p( 750, 25) );

        this.addChild(pMenu, 1);

    },
    runThisTest: function(){
        if(this._jsonFile){
            var pLayer = new CocostudioParserJsonLayer(this._jsonFile);
            this.addChild(pLayer);
        }else{
            var winSize = cc.director.getWinSize();

            var pMenu = cc.Menu.create();
            pMenu.x = 0;
            pMenu.y = 0;
            cc.MenuItemFont.setFontName("fonts/arial.ttf");
            cc.MenuItemFont.setFontSize(24);

            for (var i = 0; i < g_parsersTests.length; ++i) {
                var selItem = g_parsersTests[i];
                var pItem = cc.MenuItemFont.create(selItem.title,
                    selItem.test, this);
                pItem.x = winSize.width / 2;
                pItem.y = winSize.height - (i + 1) * LINE_SPACE;
                pMenu.addChild(pItem, ITEM_TAG_BASIC + i);
            }
            this.addChild(pMenu);
        }

        cc.director.runScene(this);
    },
    BackCallback: function(){
        if(this._jsonFile){
            new CocostudioParserJsonScene().runThisTest();
        }else{
            new CocoStudioTestScene().runThisTest();
        }
    }
});