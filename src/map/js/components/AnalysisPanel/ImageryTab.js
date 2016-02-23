import {analysisActions} from 'actions/AnalysisActions';
import ImageryComponent from 'components/LayerPanel/ImageryComponent';
import LayerCheckbox from 'components/LayerPanel/LayerCheckbox';
import {layersConfig, layerPanelText, analysisPanelText} from 'js/config';
import {AlertsSvg, AnalysisSvg, ImagerySvg} from 'utils/svgs';
import {mapActions} from 'actions/MapActions';
import {mapStore} from 'stores/MapStore';
import KEYS from 'js/constants';
import React from 'react';

export default class ImageryTab extends React.Component {

  constructor (props) {
    super(props);
    mapStore.listen(this.storeUpdated.bind(this));
    this.state = mapStore.getState();
  }

  storeUpdated () {
    this.setState(mapStore.getState());
  }

  componentDidMount () {
    // let calendar = new window.Kalendae(this.refs.date, {
    //   mode: 'range'
    // });
    // calendar.subscribe('change', function (date) {
    //   console.debug(date);
    // });
  }

  render () {
    let className = 'text-center';
    if (this.props.activeTab !== analysisPanelText.imageryTabId) { className += ' hidden'; }
    let activeLayers = this.state.activeLayers;
    let dgLayer = layersConfig.filter((l) => l.id === KEYS.digitalGlobe)[0];


    return (
      <div className={className}>
        <p>{analysisPanelText.imageryArea}</p>
        <LayerCheckbox key={dgLayer.id} childrenVisible={true} layer={dgLayer} checked={activeLayers.indexOf(dgLayer.id) > -1}>
          <ImageryComponent {...this.state} domId={dgLayer.calendar.domId} domClass={dgLayer.calendar.domClass} childDomClass={dgLayer.calendar.childDomClass} startDate={dgLayer.calendar.startDate} currentDate={dgLayer.calendar.currentDate} />
        </LayerCheckbox>
      </div>
    );
  }

}