// import LayersHelper from 'helpers/LayersHelper';
import ImagerySettings from 'components/LayerPanel/ImagerySettings';
import {mapStore} from 'stores/MapStore';
import {mapActions} from 'actions/MapActions';
import DateHelper from 'helpers/DateHelper';
import {modalActions} from 'actions/ModalActions';
import React from 'react';

export default class ImageryComponent extends React.Component {

  constructor (props) {
    super(props);
    mapStore.listen(this.storeUpdated.bind(this));
    this.state = mapStore.getState();
  }

  storeUpdated () {
    this.setState(mapStore.getState());
  }

  render () {

    let startDate = window.Kalendae.moment(this.state.dgStartDate);
    let endDate = window.Kalendae.moment(this.state.dgEndDate);

    //<div className={`customize-options ${this.props.customizeOpen === true ? '' : 'hidden'}`}> --> on timeline container!

    return <div className={`timeline-container ${this.props.options.domClass}`}>
      <ImagerySettings />
      <div id='imagery-date-ranges'>
        <span className='imagery-calendar-label'>{this.props.options.minLabel}</span>
        <button className={`gfw-btn white pointer ${this.state.calendarVisible === 'imageryStart' ? ' current' : ''}`} onClick={this.changeStart.bind(this)}>{DateHelper.getDate(startDate)}</button>
        <span className='imagery-calendar-label'>{this.props.options.maxLabel}</span>
        <button className={`gfw-btn white pointer ${this.state.calendarVisible === 'imageryEnd' ? ' current' : ''}`} onClick={this.changeEnd.bind(this)}>{DateHelper.getDate(endDate)}</button>
      </div>
    </div>;
  }

  changeStart() {
    modalActions.showCalendarModal('start');
    mapActions.setCalendar('imageryStart');
  }

  changeEnd() {
    modalActions.showCalendarModal('end');
    mapActions.setCalendar('imageryEnd');
  }

}
