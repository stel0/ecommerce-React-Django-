import { Fragment } from "react";
import { connect } from "react-redux";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";

const Alert = ({ alert }) => {
  const displayAlert = () => {
    if (alert !== null) {
      return (
        <div className={`rounded-md bg-${alert.alertType}-100 p-4`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {alert.alertType === "green" ? (
                <CheckCircleIcon
                  className={`h-5 w-5 text-green-600`}
                  aria-hidden="true"
                />
              ) : (
                <XCircleIcon
                  className={`h-5 w-5 text-red-600`}
                  aria-hidden="true"
                />
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium text-${alert.alertType}-800`}>
                {alert.msg}
              </p>
            </div>
          </div>
        </div>
      );
    } else {
      return <Fragment></Fragment>;
    }
  };
  return <Fragment>{displayAlert()}</Fragment>;
};

const mapStateToProps = (state) => ({
  alert: state.Alert.alert,
});

export default connect(mapStateToProps)(Alert);
