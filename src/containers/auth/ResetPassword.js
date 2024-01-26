import Layout from "../../HOCs/Layout";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

import { reset_password } from "../../redux/actions/auth";

const ResetPassword = ({ reset_password, loading }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [requestSent, setRequestSent] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
  });

  const { email } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSumbit = (e) => {
    e.preventDefault();
    reset_password(email);
    setRequestSent(true);
    window.scrollTo(0, 0);
  };

  if (requestSent && !loading) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Recover your password
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={(e) => onSumbit(e)} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    name="email"
                    type="email"
                    value={email}
                    placeholder="Enter your email address"
                    onChange={(e) => onChange(e)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {loading ? (
                    <Oval color="#fff" width={20} height={20} />
                  ) : (
                    "Send to email"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const mapStateToProp = (state) => ({
  loading: state.Auth.loading,
});

export default connect(mapStateToProp, { reset_password })(ResetPassword);
