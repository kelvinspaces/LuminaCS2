import { ButtonTheme, Tooltip, Button, ConfirmationDialog, Panel, Portal, FloatingButton, PanelSection, PanelSectionRow, FormattedParagraphs, Dropdown, Icon } from "cs2/ui";
import { bindValue, trigger, useValue, } from "cs2/api";
import { game, tool, Theme, } from "cs2/bindings";
import { getModule, ModuleRegistryExtend } from "cs2/modding";
import { VanillaComponentResolver } from "classes/VanillaComponentResolver";
import { Slider, PropsSlider, SliderValueTransformer } from "./slider";
//import { LocalizedString, useLocalization } from "cs2/l10n";
import { useLocalization } from "cs2/l10n";
import mod from "../../mod.json";
import "../luminapanel.scss"; 
import { useState } from "react";
import { createPortal } from "react-dom";

export let isInstalled$ = false;
export let ColorAdjustmentsEnabled = true;


// ColorAdjustments
export const PostExposure$ = bindValue<number>(mod.id, 'PostExposure');
export const Contrast$ = bindValue<number>(mod.id, 'GetContrast');
export const HueShift$ = bindValue<number>(mod.id, 'GetHueShift');
export const Saturation$ = bindValue<number>(mod.id, 'GetSaturation');

// White Balance
export const Temperature$ = bindValue<number>(mod.id, 'GetTemperature');
export const Tint$ = bindValue<number>(mod.id, 'GetTint');

// Shadows Midtones Highlights
export const Shadows$ = bindValue<number>(mod.id, 'GetShadows');
export const Midtones$ = bindValue<number>(mod.id, 'GetMidtones');
export const Highlights$ =  bindValue<number>(mod.id, 'GetHighlights');


// const SliderTheme: Theme | any = getModule(
//   "game-ui/common/input/slider/themes/default.module.scss",
//   "classes"
//  );


function toggle_ToolEnabled() {
  ColorAdjustmentsEnabled = !ColorAdjustmentsEnabled;
}


let tab1 = false;
let tab2 = false;



export const YourPanelComponent: React.FC<any> = () => {
  // Values
  const PEValue = useValue(PostExposure$);
  const COValue = useValue(Contrast$);
  const HSValue = useValue(HueShift$);
  const SAValue = useValue(Saturation$);

  //Use localization
  const { translate } = useLocalization();


  // WhiteBalance
  const TempValue = useValue(Temperature$);
  const TintValue = useValue(Tint$);


  // Shadows/Midtones/highlights
const ShadowsValue = useValue(Shadows$);
const MidtonesValue = useValue(Midtones$);
const HighlightsValue = useValue(Highlights$);


// Initialize state variables using useState hook
const [ColorAdjustmentsEnabled$, setCA] = useState(true);
const [SettingsEnabled$, setSettings] = useState(false);
  


  const [tab1, setTab1] = useState(false);
  const moveItIconSrc = tab1 ? "coui://ui-mods/images/SendToLumina.svg" : "coui://ui-mods/images/SendToLumina.svg";
  
  const handleSliderChange = (value: number) => {
    // Round the value to the nearest step size of 0.001
    const roundedValue = Math.round(value / 0.001) * 0.001;
    // Convert the rounded value to an integer if necessary
    const id = parseInt(roundedValue.toString());
    // Trigger the action with the adjusted value
    trigger(mod.id, 'SetPostExposure', id);
};

const handleContrast = (value: number) => {
  // Round the value to the nearest step size of 0.001
  const roundedValue = Math.round(value / 0.001) * 0.001;
  // Convert the rounded value to an integer if necessary
  const id = parseInt(roundedValue.toString());
  // Trigger the action with the adjusted value
  trigger(mod.id, 'SetContrast', id);
};





const handleHueShift = (value: number) => {
  // Round the value to the nearest step size of 0.001
  const roundedValue = Math.round(value / 0.001) * 0.001;
  // Convert the rounded value to an integer if necessary
  const id = parseInt(roundedValue.toString());
  // Trigger the action with the adjusted value
  trigger(mod.id, 'SetHueShift', id);
};

const handleSaturation = (value: number) => {
  // Round the value to the nearest step size of 0.001
  const roundedValue = Math.round(value / 0.001) * 0.001;
  // Convert the rounded value to an integer if necessary
  const id = parseInt(roundedValue.toString());
  // Trigger the action with the adjusted value
  trigger(mod.id, 'SetSaturation', id);
};


// WhiteBalance

const handleTemperature = (value: number) => {
  // Round the value to the nearest step size of 0.001
  const roundedValue = Math.round(value / 0.001) * 0.001;
  // Convert the rounded value to an integer if necessary
  const id = parseInt(roundedValue.toString());
  // Trigger the action with the adjusted value
  trigger(mod.id, 'SetTemperature', id);
};

const handleTint = (value: number) => {
  // Round the value to the nearest step size of 0.001
  const roundedValue = Math.round(value / 0.001) * 0.001;
  // Convert the rounded value to an integer if necessary
  const id = parseInt(roundedValue.toString());
  // Trigger the action with the adjusted value
  trigger(mod.id, 'SetTint', id);
};


function SaveSettings() {
  console.log("Sent to Lumina button clicked.");
  trigger(mod.id, 'Save');
}

function ResetToDefault() {
  console.log("Sent to Lumina button clicked.");
  trigger(mod.id, 'ResetLuminaSettings');
}
  

// Shadows
const handleShadows = (value: number) => {
  // Round the value to the nearest step size of 0.001
  const roundedValue = Math.round(value / 0.001) * 0.001;
  // Convert the rounded value to an integer if necessary
  const id = start + (value * stepSize);
  // Trigger the action with the adjusted value
  trigger(mod.id, 'SetShadows', id);
};

const handleMidtones = (value: number) => {
  // Round the value to the nearest step size of 0.001
  const roundedValue = Math.round(value / 0.001) * 0.001;
  // Convert the rounded value to an integer if necessary
  const id = start + (value * stepSize);
  // Trigger the action with the adjusted value
  trigger(mod.id, 'SetMidtones', id);
};

const handleHighlights = (value: number) => {
  // Round the value to the nearest step size of 0.001
  const roundedValue = Math.round(value / 0.001) * 0.001;
  // Convert the rounded value to an integer if necessary
  const id = start + (value * stepSize);
  // Trigger the action with the adjusted value
  trigger(mod.id, 'SetHighlights', id);
};

const start = -1;
  const end = 1;
  const stepSize = 0.0001;

  // Calculate the number of steps based on the range
  const numberOfSteps = Math.floor((end - start) / stepSize);



return (
  <div className="Global">


<div className="TabsRow">

    <Tooltip
  tooltip={translate("LUMINA.colortooltip")} // Specify the content of the tooltip
  disabled={false} // Specify whether the tooltip is disabled (default: false)
  alignment="center" // Specify the alignment of the tooltip (e.g., "start", "center", "end")
  className="custom-tooltip" // Specify additional class names for styling purposes
>
<button 
  className={tab1 ? 'ColorAdjustmentsButtonDeselected' : 'ColorAdjustmentsButton'} 
  onSelect={() => {
    setTab1(!tab1);
    console.log("[LUMINA] Toggled Color panel.");
  }}
  onClick={() => { setCA(true)
    setSettings(false)
   }}>
</button>
</Tooltip>

<Tooltip
  tooltip={translate("LUMINA.settingstooltip")}// Specify the content of the tooltip
  disabled={false} // Specify whether the tooltip is disabled (default: false)
  alignment="center" // Specify the alignment of the tooltip (e.g., "start", "center", "end")
  className="custom-tooltip" // Specify additional class names for styling purposes
>
<button 
  className={tab1 ? 'SettingsButtonDeselected' : 'SettingsButton'} 
  onSelect={() => {
    console.log("[LUMINA] Toggled Settings panel.");
  }}
  onClick={() => { setCA(false)
    setSettings(true)
 ;}}>
</button>




</Tooltip>





    </div>




  <div  className="Panel">
    
   





    {ColorAdjustmentsEnabled$ && (
    <div className="ColorAdjustments">
 
        <label className="title_SVH title_zQN CALabel">{translate("LUMINA.coloradjustments")}</label>
        <label className="title_SVH title_zQN PostExposureLabel" style={{ whiteSpace: 'nowrap' }}>{translate("LUMINA.postexposure")}</label>
        <label className="title_SVH title_zQN PostExposureValue" >{PEValue.toString()} </label>

        <Slider
          value={PEValue}
          start={-5}
          end={1}
          className="PostExposureSlider"
          gamepadStep={0.001}

        
          valueTransformer={SliderValueTransformer.intTransformer}
          disabled={false}
          noFill={false}
          onChange={(number) => handleSliderChange(number)}
          />

        <label className="title_SVH title_zQN ContrastLabel" style={{ whiteSpace: 'nowrap' }}>{translate("LUMINA.contrast")}</label>
        <label className="title_SVH title_zQN ContrastValue" >{COValue.toString()} </label>

        <Slider
          value={COValue}
          start={-100}
          end={100}
          className="ContrastSlider"
          gamepadStep={0.001}

        
          valueTransformer={SliderValueTransformer.intTransformer}
          disabled={false}
          noFill={false}
          onChange={(number) => handleContrast(number)}
          // onDragStart={() => console.log("onDragStart")}
          // onDragEnd={() => console.log("onDragEnd")}
          // onMouseOver={() => console.log("onMouseOver")}
          // onMouseLeave={() => console.log("onMouseLeave")}
        />

<label className="title_SVH title_zQN HueshiftLabel" style={{ whiteSpace: 'nowrap' }}>{translate("LUMINA.hueshift")}</label>
        <label className="title_SVH title_zQN HueshiftValue" >{HSValue.toString()} </label>

        <Slider
          value={HSValue}
          start={-180}
          end={180}
          className="HueshiftSlider"
          gamepadStep={0.001}

        
          valueTransformer={SliderValueTransformer.intTransformer}
          disabled={false}
          noFill={false}
          onChange={(number) => handleHueShift(number)}
          // onDragStart={() => console.log("onDragStart")}
          // onDragEnd={() => console.log("onDragEnd")}
          // onMouseOver={() => console.log("onMouseOver")}
          // onMouseLeave={() => console.log("onMouseLeave")}
        />

<label className="title_SVH title_zQN SaturationLabel" style={{ whiteSpace: 'nowrap' }}>{translate("LUMINA.saturation")}</label>
        <label className="title_SVH title_zQN SaturationValue" >{SAValue.toString()} </label>

        <Slider
          value={SAValue}
          start={-100}
          end={100}
          className="SaturationSlider"
          gamepadStep={0.001}

        
          valueTransformer={SliderValueTransformer.intTransformer}
          disabled={false}
          noFill={false}
          onChange={(number) => handleSaturation(number)}
          // onDragStart={() => console.log("onDragStart")}
          // onDragEnd={() => console.log("onDragEnd")}
          // onMouseOver={() => console.log("onMouseOver")}
          // onMouseLeave={() => console.log("onMouseLeave")}
        />

<label className="title_SVH title_zQN WBLabel">{translate("LUMINA.whitebalance")}</label>
<label className="title_SVH title_zQN TemperatureLabel" style={{ whiteSpace: 'nowrap' }}>{translate("LUMINA.temperature")}</label>
        <label className="title_SVH title_zQN TemperatureValue" >{TempValue.toString()} </label>

        <Slider
          value={TempValue}
          start={-100}
          end={100}
          className="TemperatureSlider"
          gamepadStep={0.001}

        
          valueTransformer={SliderValueTransformer.intTransformer}
          disabled={false}
          noFill={false}
          onChange={(number) => handleTemperature(number)}
          // onDragStart={() => console.log("onDragStart")}
          // onDragEnd={() => console.log("onDragEnd")}
          // onMouseOver={() => console.log("onMouseOver")}
          // onMouseLeave={() => console.log("onMouseLeave")}
        />

<label className="title_SVH title_zQN TintLabel" style={{ whiteSpace: 'nowrap' }}>{translate("LUMINA.tint")}</label>
        <label className="title_SVH title_zQN TintValue" >{TintValue.toString()} </label>

        <Slider
          value={TintValue}
          start={-100}
          end={100}
          className="TintSlider"
          gamepadStep={0.001}

        
          valueTransformer={SliderValueTransformer.intTransformer}
          disabled={false}
          noFill={false}
          onChange={(number) => handleTint(number)}
          // onDragStart={() => console.log("onDragStart")}
          // onDragEnd={() => console.log("onDragEnd")}
          // onMouseOver={() => console.log("onMouseOver")}
          // onMouseLeave={() => console.log("onMouseLeave")}
        />


<label className="title_SVH title_zQN BLabel">{translate("LUMINA.brightness")}</label>

<label className="title_SVH title_zQN ShadowsLabel" style={{ whiteSpace: 'nowrap' }}>{translate("LUMINA.shadows")}</label>
        <label className="title_SVH title_zQN ShadowsValue" >{ShadowsValue.toString()} </label>

        <Slider
          value={(ShadowsValue - start) / stepSize}
          start={-1}
          end={numberOfSteps}
          className="ShadowsSlider"
          gamepadStep={0.001}
     
        
          valueTransformer={SliderValueTransformer.intTransformer}
          disabled={false}
          noFill={false}
          onChange={(number) => handleShadows(number)}
           // Set the step size here
          // onDragStart={() => console.log("onDragStart")}
          // onDragEnd={() => console.log("onDragEnd")}
          // onMouseOver={() => console.log("onMouseOver")}
          // onMouseLeave={() => console.log("onMouseLeave")}
        />

        
<label className="title_SVH title_zQN MidtonesLabel" style={{ whiteSpace: 'nowrap' }}>{translate("LUMINA.midtones")}</label>
        <label className="title_SVH title_zQN MidtonesValue" >{MidtonesValue.toString()} </label>

        <Slider
           value={(MidtonesValue - start) / stepSize}
           start={-1}
           end={numberOfSteps}
          className="MidtonesSlider"
          gamepadStep={0.001}

        
          valueTransformer={SliderValueTransformer.intTransformer}
          disabled={false}
          noFill={false}
          onChange={(number) => handleMidtones(number)}
          // onDragStart={() => console.log("onDragStart")}
          // onDragEnd={() => console.log("onDragEnd")}
          // onMouseOver={() => console.log("onMouseOver")}
          // onMouseLeave={() => console.log("onMouseLeave")}
        />

<label className="title_SVH title_zQN HighlightsLabel" style={{ whiteSpace: 'nowrap' }}>{translate("LUMINA.highlights")}</label>
        <label className="title_SVH title_zQN HighlightsValue" >{HighlightsValue.toString()} </label>

        <Slider
           value={(HighlightsValue - start) / stepSize}
           start={-1}
           end={numberOfSteps}
          className="HighlightsSlider"
          gamepadStep={0.001}

        
          valueTransformer={SliderValueTransformer.intTransformer}
          disabled={false}
          noFill={false}
          onChange={(number) => handleHighlights(number)}
          // onDragStart={() => console.log("onDragStart")}
          // onDragEnd={() => console.log("onDragEnd")}
          // onMouseOver={() => console.log("onMouseOver")}
          // onMouseLeave={() => console.log("onMouseLeave")}
        />








</div>


)}

{SettingsEnabled$ && (
    <div className="SettingsPanel">
    <button 

    onClick={SaveSettings}
    className="button_uFa child-opacity-transition_nkS button_uFa child-opacity-transition_nkS LuminaSaveButton">{translate("LUMINA.save")}</button>
<div className="tinted-icon_iKo icon_zVk SaveButtonLuminaImage" > </div>
    <button 

    
    onClick={ResetToDefault}
    className="button_uFa child-opacity-transition_nkS button_uFa child-opacity-transition_nkS LuminaResetSettingsButton">{translate("LUMINA.resettodefault")}</button>

    <h1 className="title_SVH title_zQN VersionCheckLabel">v1.4r1</h1>








    </div>



  )}



</div>

</div>
)}

