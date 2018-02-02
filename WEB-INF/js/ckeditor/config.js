/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {

	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config


	// Toolbar
	// ------------------------------
	config.filebrowserUploadUrl="../examZone/uploadCKEditor";
	config.toolbar = 'MyToolbar';//把默认工具栏改为‘MyToolbar’     
    config.removePlugins = 'elementspath';
    config.toolbar_MyToolbar =     
    [     
     /*['Source','-','Save','NewPage','Preview','-','Templates'],     
     ['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print', 'SpellChecker', 'Scayt'],     
     ['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],     
     ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField'],     
     ['BidiLtr', 'BidiRtl'],     
     '/', */    
     ['Cut','Copy','Paste'], 
     ['Bold','Italic','Underline']
     /*['Bold','Italic','Underline'],     
     ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],     
     ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],     
     ['Link','Unlink','Anchor'],     
     ['Image'],['Undo'],   
     '/',     
     ['Styles','Format','Font','FontSize'],     
     ['TextColor','BGColor'],     
     ['Maximize', 'ShowBlocks']*/
    ];
	// The toolbar groups arrangement, optimized for two toolbar rows.
	/*config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' },
		{ name: 'pbckcode' }
	];*/


	// Extra config
	// ------------------------------



	// Extra plugins
	// ------------------------------

};
