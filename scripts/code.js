/*
 (c) VNexsus 2021-2022

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
 
(function(window, undefined){
 
	window.timer = null;
 
    window.Asc.plugin.init = function()  {
    };

    window.Asc.plugin.button = function(id)  {
		this.executeCommand("close", "");
    };
	
	window.Asc.plugin.event_onDocumentContentReady = function()  {
		var confidential = false;
		
		if(!window.top.ASC.Files.Editor.configurationParams.document.permissions.print){
			confidential = true;
		
			switch (window.Asc.plugin.info.editorType)
			{
				case 'word': 
					window.parent.$("#id_viewer").after('<div class="confidential_watermark" style="position: absolute; left: 0; right: 0; top: 0; height: 100%; z-index: 2;"></div>');
					break;
				case 'cell': {
					window.parent.$("#area_id_parent").before('<div class="confidential_watermark" style="position: absolute; left: 0; right: 0; top: 0; height: 100%; z-index: 2;"></div>');
					break;
				}
				case 'slide': {
					window.parent.$("#id_viewer").after('<div class="confidential_watermark" style="position: absolute; left: 0; right: 0; top: 0; height: 100%; z-index: 6;"></div>');
					window.parent.$("#presentation-preview").append('<div class="confidential_watermark" style="position: absolute; left: 0; right: 0; top: 0; height: 100%; z-index: 6; pointer-events: none"></div>')
					break;
				}
			}
		}


		if(confidential) {
			window.setWatermark();
			window.timer = window.setInterval(window.setWatermark, 5000);
			var button = window.parent.$("img[src*='0195F913-1BBB-FC0A-1897-C9E71D798040']");
			if(button.length > 0){
				var b_src = button[0].src;
				window.setTimeout(function(){button[0].blur(); button[0].src = b_src.replace("-off.",".").replace(".png", "-on.png")},10); 
			}
		}
		else{
			window.clearInterval(window.timer);
			window.parent.$(".confidential_watermark").remove();
			var button = window.parent.$("img[src*='0195F913-1BBB-FC0A-1897-C9E71D798040']");
			if(button.length > 0){
				var b_src = button[0].src;
				window.setTimeout(function(){button[0].blur(); button[0].src = b_src.replace("-on.",".").replace(".png", "-off.png")},10); 
			}
		}
	};

	window.setWatermark = function()
	{
		window.parent.$(".confidential_watermark").each(function(index){ 
			$(this).html(`<svg width="100%" height="100%" >
				<defs>
					<pattern id="watermark`+ index +`" x="0" y="0" width="500" height="500" patternUnits="userSpaceOnUse">
						<text x="0" y="0" font-size="27" font-weight="800" fill="#FFFFFF" fill-opacity="0.2" stroke="#FF0000" stroke-with="1" stroke-opacity="0.5" stroke-linecap="butt" stroke-linejoin="miter" font-family="Arial, Helvetica, sans-serif" transform="translate(50,250) rotate(-45)">КОНФИДЕНЦИАЛЬНО</text>
						<text x="0" y="30" font-size="25" font-weight="900" fill="#FFFFFF" fill-opacity="0.2" stroke="#FF0000" stroke-with="1" stroke-opacity="0.5" stroke-linecap="butt" stroke-linejoin="miter" font-family="Arial, Helvetica, sans-serif" transform="translate(50,250) rotate(-45)">`+ window.Asc.plugin.info.userName +`</text>
						<text x="0" y="65" font-size="25" font-weight="900" fill="#FFFFFF" fill-opacity="0.2" stroke="#FF0000" stroke-with="1" stroke-opacity="0.5" stroke-linecap="butt" stroke-linejoin="miter" font-family="Arial, Helvetica, sans-serif" transform="translate(50,250) rotate(-45)">`+ new Date().toLocaleDateString("ru") + " " + new Date().toLocaleTimeString("ru", {hour: "2-digit", minute:"2-digit"}) +`</text>
					</pattern>
				</defs>
				<rect x="0" y="0" width="100%" height="100%" fill="url(#watermark`+ index +`)"></rect>
			</svg>`)
		});
	}

})(window, undefined);
