import ModalWrapper from 'components/Modals/ModalWrapper';
import {modalText} from 'js/config';
import dom from 'dojo/dom';
import {mapStore} from 'stores/MapStore';
import {modalActions} from 'actions/ModalActions';
import Loader from 'components/Loader';
import geometryEngine from 'esri/geometry/geometryEngine';
import Deferred from 'dojo/Deferred';
import xhr from 'dojo/request/xhr';
// import {loadJS} from 'utils/loaders';
import React from 'react';

export default class SubscriptionModal extends React.Component {

  constructor (props) {
    super(props);
    mapStore.listen(this.storeUpdated.bind(this));
    // this.state = mapStore.getState();

    this.state = {
      currentCustomGraphic: undefined,
      email: '',
      phoneNumber: '',
      emailErrors: false,
      phoneErrors: false,
      isSubscribing: false,
      success: false
    };
  }

  storeUpdated () {
    let newState = mapStore.getState();
    if (newState.currentCustomGraphic !== this.state.currentCustomGraphic) {
      this.setState({ currentCustomGraphic: newState.currentCustomGraphic });
    }
  }

  validateEmail (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePhone (phoneNumber) { //todo: use old phone # validation library
    if (phoneNumber.length > 5) {
      return true;
    } else {
      return false;
    }
  }

  updateName = evt => {
    this.setState({
      customFeatName: evt.target.value
    });
  };

  updateEmail = evt => {
    this.setState({
      email: evt.target.value
    });
  };

  updatePhone = evt => {
    this.setState({
      phoneNumber: evt.target.value
    });
  };

  subscribe = () => {
    let honeyPotValue = dom.byId(modalText.subscription.verifyInput).value;
    if (honeyPotValue) {
      return;
    }

    let validEmail = this.validateEmail(this.state.email);
    let validPhone = this.validatePhone(this.state.phoneNumber);

    if (!this.state.email || !validEmail) {
      this.setState({
        emailErrors: true,
        phoneErrors: false
      });
    } else if (this.state.phoneNumber && !validPhone) {
      this.setState({
        emailErrors: false,
        phoneErrors: true
      });
    } else {
      this.setState({
        emailErrors: false,
        phoneErrors: false,
        isUploading: true
      });

      var subscribeUrl = 'https://gfw-fires.wri.org/subscribe_by_polygon',
        // deferred = new Deferred(),
        params = {
          'msg_addr': this.state.email,
          'msg_type': 'email',
          'area_name': this.state.currentCustomGraphic.attributes.ALERTS_LABEL
        };

      // Simplify the geometry and then add a stringified and simpler version of it to params.features
      let simplifiedGeometry = geometryEngine.simplify(this.state.currentCustomGraphic.geometry);
      params.features = JSON.stringify({
          'rings': simplifiedGeometry.rings,
          'spatialReference': simplifiedGeometry.spatialReference
      });

      let success = function () {
        // alert('succcesss');
        setTimeout( () => {
          this.close();
          this.setState({
            isUploading: false
          });
        }, 500);
      }.bind(this);
      let error = function () {
        // alert('error');
        setTimeout( () => {
          this.close();
          this.setState({
            isUploading: false
          });
        }, 1000);

      }.bind(this);


      $.ajax({
        type: 'GET',
        url: subscribeUrl,
        data: params,
        error: error,
        success: success,
        dataType: 'json'
      });

      // let postRequest = $.post(subscribeUrl, params, function( data ) {
      //   console.log(data);
      //   alert( 'success' );
      // })
      //   .fail(function() {
      //     alert( 'error' );
      //   })
      //   .always(function() {
      //     this.setState({
      //       isUploading: false
      //     });
      //   });

      // xhr(subscribeUrl, {
      //   handleAs: 'json',
      //   method: 'POST',
      //   data: params
      // }).then(function() {
      //   this.setState({
      //     isUploading: false
      //   });
      //   alert('success');
      //
      //   deferred.resolve(true);
      //
      // }, function(err) {
        // this.setState({
        //   isUploading: false
        // });
      //   alert('There was an error subsrcribing at this time. ' + err.message);
      //   deferred.resolve(false);
      // });

      // return deferred.promise;


      // todo: submit the request, and on success or failure, hide the loader
    }
  };

  deleteFeature = () => {
    this.close();
    modalActions.removeCustomFeature(this.state.currentCustomGraphic);
  };

  close () {
		modalActions.hideModal(React.findDOMNode(this).parentElement);
	}

  render() {
    return (
      <ModalWrapper>
        <div className='canopy-modal-title'>{modalText.subscription.title}</div>
        {this.state.currentCustomGraphic ? <input className='longer' value={this.state.customFeatName !== undefined ? this.state.customFeatName : this.state.currentCustomGraphic.attributes.featureName} onChange={this.updateName} /> : null}

        <p>{modalText.subscription.emailInstructions}</p>
        <input className='longer' value={this.state.email} placeholder={modalText.subscription.emailPlaceholder} onChange={this.updateEmail}></input>
        <div className={`submit-warning ${this.state.emailErrors ? '' : 'hidden'}`}>{modalText.subscription.warningTextEmail}</div>
        <p>{modalText.subscription.phoneInstructions}</p>
        <input className='longer' value={this.state.phoneNumber} placeholder={modalText.subscription.phonePlaceholder} onChange={this.updatePhone}></input>
        <div className={`submit-warning ${this.state.phoneErrors ? '' : 'hidden'}`}>{modalText.subscription.warningTextPhone}</div>
        <input className='hidden' id={modalText.subscription.verifyInput} />

        <div className='subscribe-container'>
          {this.state.currentCustomGraphic && this.state.currentCustomGraphic.attributes.Layer === 'custom' ?
            <button className={`subscribe-submit left btn red ${app.mobile() === true ? 'narrow' : ''}`} onClick={this.deleteFeature.bind(this)}>{modalText.subscription.deletePlaceholder}</button> : null
          }
          <button className={`subscribe-submit btn red ${app.mobile() === true ? 'narrow' : ''}${this.state.currentCustomGraphic && this.state.currentCustomGraphic.attributes.Layer === 'custom' ? ' right' : ''}`} onClick={this.subscribe.bind(this)}>{modalText.subscription.subscribePlaceholder}</button>
        </div>
        <Loader active={this.state.isUploading} />
        <div className={`submit-success ${this.state.success ? '' : 'hidden'}`}>{modalText.subscription.successMessage}</div>
      </ModalWrapper>
    );
  }

}
