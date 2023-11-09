import React from "react";

const AllExamineeQuestionare = () => {
  return (
    <>
      <div
        dir="rtl"
        className="container examinee-home-container w-100 h-100 p-5"
      >
        <h2 className="mt-5 mb-5">استطلاعات الرآي</h2>
        <div className="row m-auto">
          <div className="col-4 mb-3">
            <div className="card custom-card text-end">
              <div className="card-body">
                <h4 className="card-title">الفرقة:</h4>
              </div>
              <div className="card-footer text-cente">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className={`btn btn-primary`}
                  style={{ width: "100%" }}
                >
                  ابدأ الاستطلاع
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllExamineeQuestionare;
