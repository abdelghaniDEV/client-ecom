import React from "react";

function Qustion({ setShowAskQustion }) {
  return (
    <div>
      <div>
        <div id="question">
          <div className="flex items-center justify-between ">
            <h1 className="text-[23px] pb-3 font-[500]">Question</h1>
            <i
              data-action="closeAll"
              className="bx bx-x text-[40px] cursor-pointer close-window"
              id=""
              onClick={() => setShowAskQustion(false)}
            ></i>
          </div>
          <div className=" flex flex-col gap-2 font-normal text-[15px] lg:md:text-[18px] text-[#868686]">
            <p>
              All orders shipped with UPS Express.Always free shipping for
              orders over US $250.All orders are shipped with a UPS tracking
              number.
            </p>
            <h1 className="text-[23px] lg:text-[22px] py-5 font-[600] text-[black]">
              Returns
            </h1>
            <p>
              Items returned within 14 days of their original shipment date in
              same as new condition will be eligible for a full refund or store
              credit.
            </p>
            <p>
              Refunds will be charged back to the original form of payment used
              for purchase.
            </p>
            <p className=" ">
              Customer is responsible for shipping charges when making returns
              and shipping/handling fees of original purchase is non-refundable.
            </p>
            <p>All sale items are final purchases.</p>
            <h1 className="text-[23px] py-3 font-[600] text-[black]">
              Returns
            </h1>
            <p>
              Give us a shout if you have any other questions and/or concerns.
            </p>
            <p>
              Email:{" "}
              <a href="mailto:contact@domain.com">
                <span className="__cf_email__ text-black">
                  contact@domain.com
                </span>
              </a>
            </p>
            <p>Phone: +1 (23) 456 789</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Qustion;
