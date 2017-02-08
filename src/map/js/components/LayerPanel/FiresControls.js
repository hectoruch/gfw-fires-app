import ModisLegend from 'components/LayerPanel/ModisLegend';
import {layerActions} from 'actions/LayerActions';
import LayersHelper from 'helpers/LayersHelper';
import {modalActions} from 'actions/ModalActions';
import {layerPanelText} from 'js/config';
import DateHelper from 'helpers/DateHelper';
import {mapActions} from 'actions/MapActions';
import React from 'react';

let firesOptions = layerPanelText.firesOptions;

export default class FiresControls extends React.Component {

  componentDidUpdate(prevProps) {
    if (prevProps.firesSelectIndex !== this.props.firesSelectIndex) {
      LayersHelper.updateFiresLayerDefinitions(this.props.firesSelectIndex);
    }
  }

  componentWillReceiveProps(nextProps) {
    // Set the default layer definition when the map has been loaded
    if (!this.props.loaded && nextProps.loaded) {
      LayersHelper.updateFiresLayerDefinitions(nextProps.firesSelectIndex);
    }
  }

  render () {
    let activeItem = firesOptions[this.props.firesSelectIndex];

    let startDate = window.Kalendae.moment(this.props.archiveModisStartDate);
    let endDate = window.Kalendae.moment(this.props.archiveModisEndDate);

    return <div>
      <div className='timeline-container relative fires'>
        <select className='pointer' value={activeItem.value} onChange={this.changeFiresTimeline}>
          {firesOptions.map(this.optionsMap, this)}
        </select>
        <div className='active-fires-control gfw-btn sml white'>{activeItem.label}</div>
      </div>
      <div id='modis-archive-date-ranges'>
        <span className='imagery-calendar-label'>{this.props.options.minLabel}</span>
        <button className={`gfw-btn white pointer ${this.props.calendarVisible === 'archiveStart' ? ' current' : ''}`} onClick={this.changeStart.bind(this)}>{DateHelper.getDate(startDate)}</button>
        <span className='imagery-calendar-label'>{this.props.options.maxLabel}</span>
        <button className={`gfw-btn white pointer ${this.props.calendarVisible === 'archiveEnd' ? ' current' : ''}`} onClick={this.changeEnd.bind(this)}>{DateHelper.getDate(endDate)}</button>
      </div>
    </div>;
  }

  showFiresModal () {
    modalActions.showFiresModal();
  }

  optionsMap (item, index) {
    return <option key={index} value={item.value}>{item.label}</option>;
  }

  changeFiresTimeline (evt) {
    layerActions.changeFiresTimeline(evt.target.selectedIndex);
  }

  changeStart() {
    modalActions.showCalendarModal('start');
    mapActions.setCalendar('archiveModisStart');
  }

  changeEnd() {
    modalActions.showCalendarModal('end');
    mapActions.setCalendar('archiveModisEnd');
  }

}
