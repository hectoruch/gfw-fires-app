import LayersHelper from 'helpers/LayersHelper';
import {mapStore} from 'stores/MapStore';
import {layerActions} from 'actions/LayerActions';
import KEYS from 'js/constants';
import React from 'react';


export default class ImagerySettings extends React.Component {

  constructor (props) {
    super(props);
    mapStore.listen(this.storeUpdated.bind(this));
    this.state = mapStore.getState();
  }

  storeUpdated () {
    this.setState(mapStore.getState());
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.footprintsVisible !== this.state.footprintsVisible) {
      console.log('footprintsVisible', this.state.footprintsVisible)
      if (this.state.footprintsVisible) {
        LayersHelper.showLayer(KEYS.boundingBoxes);
      } else {
        LayersHelper.hideLayer(KEYS.boundingBoxes);
      }
    }
  }

  render () {
    console.log(this.state)
    return <div className={'timeline-container'}>
      <p>Advanced Settings</p>
      <input onChange={this.toggleFootprints.bind(this)} checked={this.state.footprintsVisible} type='checkbox'>Display Footprints</input>
    </div>;
  }

  toggleFootprints(evt) {
    // this.setState({
    //   checked: evt.target.checked
    // });
    layerActions.toggleFootprintsVisibility();
  }

}
