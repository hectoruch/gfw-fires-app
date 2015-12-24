import TabControls from 'components/AnalysisPanel/TabControls';
import AnalysisTimeframe from 'components/AnalysisPanel/AnalysisTimeframe';
import AnalysisArea from 'components/AnalysisPanel/AnalysisArea';
import {analysisActions} from 'actions/AnalysisActions';
import {analysisPanelText as text} from 'js/config';
import {analysisStore} from 'stores/AnalysisStore';
import {modalActions} from 'actions/ModalActions';
import React from 'react';

let analysisSvg = '<use xlink:href="#icon-analysis" />';
let removeSvg = '<use xlink:href="#icon-remove" />';
let alertsSvg = '<use xlink:href="#icon-alerts" />';

export default class AnalysisTools extends React.Component {

  constructor (props) {
    super(props);
    analysisActions.setAreas();
    analysisStore.listen(this.storeUpdated.bind(this));
    let defaultState = analysisStore.getState();
    this.state = defaultState;
  }

  storeUpdated () {
    let newState = analysisStore.getState();
    this.setState(newState);
  }

  clearAnalysis () {
    if (this.state.activeTab === text.areaTabId) {
      analysisActions.clearCustomArea();
    } else {
      analysisActions.clearActiveWatershed();
    }
  }

  render () {
    let customTabActive = this.state.activeTab === text.areaTabId;
    let watershedTabActive = this.state.activeTab === text.timeframeTabId;
    let className = 'analysis-tools map-component shadow'
    if (app.mobile() === true && this.state.analysisToolsVisible === false) { className += ' hidden'; };

    return (
      <div className={className}>
        <div className='analyze-header no-shrink'>
          <svg dangerouslySetInnerHTML={{ __html: analysisSvg }}/>
          <span>{text.analyzeButton}</span>
        </div>
        <TabControls activeTab={this.state.activeTab} />
        <div className='tab-container custom-scroll'>
          <AnalysisTimeframe {...this.state} />
          <AnalysisArea {...this.state} />
        </div>
        <div className='no-shrink analysis-footer text-center'>
          <button className='gfw-btn blue'>Run Analysis</button>
        </div>
      </div>
    );
  }

}
