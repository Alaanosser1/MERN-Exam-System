import React from "react";

const ExamineePreExam = () => {
  return (
    <>
      <div
        style={{ marginTop: 100 }}
        dir={"rtl"}
        className="container w-75 landing-container p-2"
      >
        <form className="m-4 p-3">
          <div class="form-row p-2">
            <div class="form-group col-md-4">
              <h5 className="mb-3" for="inputState">
                النوع
              </h5>
              <select id="inputState" class="form-control">
                <option selected>عسكري</option>
                <option>مدني</option>
              </select>
            </div>
          </div>
          <div class="row p-2">
            <div class="form-group col-md-6 p-2">
              <h5 className="mb-3" for="inputEmail4">
                الاسم
              </h5>
              <input
                type="text"
                class="form-control"
                id="inputEmail4"
                placeholder="الاسم"
              />
            </div>
            <div class="form-group col-md-6 p-2">
              <h5 className="mb-3" for="inputPassword4">
                رقم الشرطة
              </h5>
              <input
                type="text"
                class="form-control"
                id="inputPassword4"
                placeholder="رقم الشرطة"
              />
            </div>
          </div>

          <div class="row p-2">
            <div class="form-group col-md-6 p-2">
              <h5 className="mb-3" for="inputEmail4">
                اسم الفرقة
              </h5>
              <input
                type="text"
                class="form-control"
                id="inputEmail4"
                placeholder="اسم الفرقة"
              />
            </div>
            <div class="form-group col-md-6 p-2">
              <h5 className="mb-3" for="inputPassword4">
                رقم الفرقة
              </h5>
              <input
                type="text"
                class="form-control"
                id="inputPassword4"
                placeholder="رقم الفرقة"
              />
            </div>
          </div>
          <div class="row p-2">
            <div class="form-group col-md-6 p-2">
              <h5 className="mb-3" for="inputState">
                الرتبة
              </h5>
              <select id="inputState" class="form-control">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div class="form-group col-md-6 p-2">
              <h5 className="mb-3" for="inputPassword4">
                الجهة المسؤولة
              </h5>
              <input
                type="text"
                class="form-control"
                id="inputPassword4"
                placeholder="الجهة المسؤولة"
              />
            </div>
          </div>
          <div className="row w-50 mt-4">
            <button type="submit" class="btn btn-primary mt-3 w-25">
              ابدأ
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ExamineePreExam;
