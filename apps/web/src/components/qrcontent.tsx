export function QrContent() {
  return (
    <>
      <h2 className="modal__title" id="qrcode-modal-title">
        {"知瑜网络 · 自媒体矩阵"}
      </h2>
      <p className="modal__desc">{"各大平台账号一站直达，扫码欢迎关注"}</p>
      <img
        className="modal__qrcode"
        src="/images/zhiyu-qrcode.png"
        alt="知瑜网络自媒体账号整合展示二维码"
        width="220"
        height="220"
        loading="lazy"
      />
      <p className="modal__note">
        {"此码为自媒体账号整合展示码，仅作公开展示"}
        <small>{"咨询、下单请扫宣传单（宣传页）上的联系二维码"}</small>
      </p>
      <span className="modal__tip">
        <svg className="icon" aria-hidden="true">
          <use href="#icon-users"></use>
        </svg>
        {"\n        宣传展示站 · 案例资料一站可查\n      "}
      </span>
    </>
  );
}
