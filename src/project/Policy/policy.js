import React from "react";

export default class Policy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    };
  }

  setChecked = (event) => {
    const checked = event.target.checked;
    this.setState({ checked: checked });
  };

  register = () => {
    this.props.history.push("/register");
  };

  render() {
    return (
      <div className="container text-white">
        <div className="row d-flex justify-content-center">
          <h3>Personal Data Privacy Policy</h3>
        </div>
        <div className="row d-flex justify-content-center">
          <h5>https://tranquil-basin-87439.herokuapp.com/ Privacy Policy </h5>
        </div>
        <div>
          <p>
            Our group (Matthew Kuhn, Jiaqian Shi, and Alina Sarwar) operates the
            site https://tranquil-basin-87439.herokuapp.com/ which is meant for
            its users to share movie reviews and discussions. As such there is a
            certain amount of information that is collected in the operation of
            this website. This privacy policy is meant to clarify the extent of
            the information collected, what we use this information for, and how
            our users can be assured of the safety of their information For our
            users, we request minimal personal information and only require that
            you provide your name to us. During the usage of our site, we
            collect information such as personal movie preferences via the
            movies visited or reviewed and the content of those reviews. We also
            collect discussion on those reviews. We want to assure our users
            that we do not share your personal information in any form to any
            third party vendors. This information is for academic purposes only
            and will only be shared to internal members of Northeastern
            University. We collect the above information purely in order to
            aggregate current opinions on movies and to use to that information
            in order to improve the site for customer experience and to research
            trends in movie-goers. Network specific information such as IP
            address or cookies will be stored for a period of one week only to
            necessitate the customer experience. And similarly we do not share
            this information in any way to third party vendors. After this
            period, these data will be erased to ensure customer
            confidentiality. If you wish to opt out of this information sharing,
            please contact us at shi.jiaqi@northeastern.edu and we will erase
            all of your data collected from our website.
          </p>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="defaultCheck1"
            onChange={this.setChecked}
          />
          <label className="form-check-label" htmlFor="defaultCheck1">
            I understand
          </label>
        </div>
        {this.state.checked && (
          <button className="btn btn-primary" onClick={this.register}>
            Register
          </button>
        )}
      </div>
    );
  }
}
