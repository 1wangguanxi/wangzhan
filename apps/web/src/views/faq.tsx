// Recovered from the public faq.html; editable React server view.
import { CaseGallery, SchoolGallery } from "@/features/gallery";
import { Accordion, FaqTabs, FaqCount, FaqProvider } from "@/features/faq";
import { ContactForm } from "@/features/contact";
import { Counter } from "@/components/counter";
import { ReviewList } from "@/features/reviews";
import type { Catalog } from "@zhiyu/content";
export default function View({ catalog }: { catalog: Catalog }) {
  return (
    <FaqProvider>
      <main>
        <section className="page-hero">
          <div
            className="hero__deco hero__deco--circle1"
            aria-hidden="true"
          ></div>
          <div className="hero__deco hero__deco--ring" aria-hidden="true"></div>
          <div className="container">
            <h1>
              {"24 个问题一次说清，"}
              <span style={{ color: "var(--c-primary)" }}>
                {"看完再决定找不找我们"}
              </span>
            </h1>
            <p className="page-hero__sub">
              {
                "是全包吗、怎么收费、多久能写完、能不能过、会不会泄露——提前说清楚，后面少误会。答案都出自我们的正式服务说明。"
              }
            </p>
          </div>
        </section>

        <section className="section" id="faq-list">
          <div className="container">
            <FaqTabs />
            <FaqCount />
            <div className="faq-list reveal">
              <Accordion
                category="service"
                question={
                  <>{"\n              论文是你们全包吗？\n              "}</>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                不是全包。我们做的是毕业论文/设计辅导服务，包括选题建议、开题报告指导、大纲搭建、正文写作思路辅导、修改建议、格式规范优化、查重降重辅导、答辩准备指导。说白了就是帮你把论文从无到有弄出来、弄规范、弄到位，所有内容都是辅导性质，最终论文是你自己的。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category="service"
                question={
                  <>{"\n              辅导具体包括什么？\n              "}</>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                从选题到答辩全覆盖：选题建议、开题报告/任务书指导、大纲搭建（细到三级标题）、正文写作思路辅导、按导师意见修改润色、查重降重辅导、格式规范排版、答辩准备（PPT框架建议、问题预判、模拟答辩）。每个客户建专属服务群，从开题到答辩结束全程跟进，不是交完稿就不管了。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category="service"
                question={
                  <>
                    {
                      "\n              你们怎么收费？价格是多少？\n              "
                    }
                  </>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                价格按专业、字数、难度和时间评估，扫宣传单上的联系码咨询后我们会根据你的具体情况出方案和报价，当天就能给。费用分定金和尾款：下单时付定金（一般总价50%），初稿确认后付尾款（剩50%）。我们不是层层转包的大机构，没有层层溢价，价格实在，没有隐形消费，每一分钱花在哪都清清楚楚。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category="service"
                question={
                  <>
                    {
                      "\n              多久能写完？赶时间怎么办？\n              "
                    }
                  </>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                正常情况下：开题/任务书2-3天，大纲框架1-2天，初稿写作辅导5-10天（看字数和专业难度），修改稿每轮2天，终稿排版1-2天，查重降重1-2天，答辩辅导1天。赶时间的话：每个客户有1次免费加急的机会（看辅导老师排期）；特别急的部分也可以你自己先动手改，改完发我们帮你检查，我们很鼓励这种方式。但还是建议早点下单，别卡着截止日期才来，留足修改时间。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category="service"
                question={
                  <>
                    {
                      "\n              开题报告能帮我做吗？修改呢？\n              "
                    }
                  </>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                可以。开题和任务书我们按学校模板来做，内容完整、逻辑清楚、格式规范，正常2-3天搞定，开题默认2000字左右（学校要求特别多的超出部分要补成本费）。修改方面说句实在话：导师对开题的意见往往很细碎，建议你自己动手改一改——都是小调整，你改起来更快，也更符合导师口味；实在不想自己改，我们全包也可以。另外提醒一句：开题别做太难，我们会根据你的专业和能力推荐难度适中、好写好过的题目和方向。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category="service"
                question={
                  <>{"\n              大纲细到什么程度？\n              "}</>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                具体到三级标题，每一章、每一节写什么都列清楚，1-2天交付。大纲是非常关键的一步——大纲定了，后面正文就按这个框架写，所以大纲我们会发你确认，你确认没问题了我们才开始写正文，避免后面大方向返工。\n              "
                  }
                </div>
              </Accordion>

              <Accordion
                category="price"
                question={
                  <>
                    {
                      "\n              怎么付款？定金尾款怎么分？\n              "
                    }
                  </>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                费用分定金和尾款：下单时付定金（一般总价50%），初稿确认后付尾款（剩50%）。所有钱付到指定收款账户，收款专员确认到账；付完把截图发服务群里，方便我们确认。提醒一句：请别私下转给辅导老师或任何个人——私下转账我们无法登记和担保，出问题只能你自己承担；付到指定收款账户，才有记录、有售后。尾款付之前我们发带水印版本给你核对内容和质量，尾款到账后完整无水印文件开放下载，这是保护双方的行业通行做法。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category="price"
                question={
                  <>
                    {"\n              什么情况下修改要加钱？\n              "}
                  </>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                在已确认的大纲/开题/初稿范围内、属于我们的问题、修改量不超全文20%、初稿后3轮以内——这些都免费改。需要加钱的主要是「新需求」：换题目、换研究方向/方法、加减章节、单次修改量超全文20%的大段重写、导师突然提全新要求、初稿后超3轮的修改、二次降重、专门降AI检测率、完整PPT制作、程序调试/功能定制、格式要求反复变更。加钱修改会先由辅导老师评估工作量，前端顾问跟你沟通好费用和时间，你同意并付钱了我们才开始改，你不同意就维持原版本，不会强行改。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category="price"
                question={
                  <>{"\n              能退款吗？什么规则？\n              "}</>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                论文辅导属于虚拟知识服务，服务开始后就产生了人力和时间成本，所以已完成并交付的内容原则上不退款。具体规则：服务没开始（没分配老师、没开工）定金全退；服务进行中按服务进度比例退款——完成了多少、按进度扣多少、剩下的退多少，具体比例和计算方式不口头承诺，签约时逐项写进协议，白纸黑字算清楚；初稿已交付原则上不退定金（确认是我们质量问题的，负责人评估后酌情退部分）；终稿已交付、尾款已付不退，但售后继续有效到答辩结束；因我们原因没法完成服务的，定金和已付尾款全退，酌情补偿。退款由负责人审批，走原支付渠道，3个工作日内到账。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category="price"
                question={<>{"\n              有优惠吗？\n              "}</>}
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                有。我们的客户很大一部分是老客户推荐来的，所以推荐机制很实在：你推荐身边有需要的同学来，推荐成功后我们给你发推荐红包表示感谢，你同学也能享受优惠。具体活动扫码问前端顾问，咨询不收费、不催单。\n              "
                  }
                </div>
              </Accordion>

              <Accordion
                category="quality"
                question={
                  <>
                    {
                      "\n              能保证通过吗？不过退款吗？\n              "
                    }
                  </>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                我们不画饼、不乱承诺——说「百分百保证通过」的都是骗你的，最终能不能通过受很多因素影响（课题难度、导师要求、答辩临场发挥等）。我们能保证的是：内容和格式做到符合学校要求，帮你准备答辩问题和回答思路，只要你自己上点心、答辩别太紧张，通过没问题。往年我们辅导的学员通过率在95%以上。退款不按「过不过」算，按服务进度规则执行（见「能退款吗？什么规则？」），但因为我们的原因没法完成服务的，全退并酌情补偿。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category="quality"
                question={
                  <>{"\n              辅导老师什么水平？\n              "}</>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                后端辅导老师20人以上，以工科为主（机械、土木、计算机、电子、化工等），也覆盖文科、理科、艺术类。每位老师都是经过严格筛选、有多年论文辅导经验的，不是临时找的兼职。管理上是「师傅带徒弟」：新老师由资深老师带一段时间，熟悉我们的标准和流程后才能独立接单，保证每篇论文质量在同一水平线上。每位老师同时跟进的订单数量有上限，保证有足够时间精力做好每一篇。我们每年承接5000单以上，各种专业、各种要求都见过。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category="quality"
                question={
                  <>{"\n              三级审核是什么？\n              "}</>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                每一篇论文交付前都要过三道关卡：辅导老师自审 → 交叉审核（其他老师互查）→ 主理人抽检。质量审核团队5人以上，独立于写作团队，保证审核的客观和严格。订单量大但每一篇都经过严格把关，我们不搞流水线批量生产，旺季宁可控制接单量也不粗制滥造。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category="quality"
                question={
                  <>{"\n              查重率能保证吗？\n              "}</>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                能。降重包含在服务里，定稿后免费降重1次，人工改写不是机器替换，降到学校要求以下。我们承诺的是定稿时重复率按学校要求的查重率达标——哪怕高0.1%，我们都尽快改。几点提醒：官方查重（知网/维普/万方）你自己买，我们可以给免费软件的报告供参考；不同软件标准不一样，建议严格按学校指定的查；一定要定稿后再查，初稿查的重复率没参考价值；要降重的话给完整查重报告（PDF版含详细对照标红），尽量别只发截图——截图看不全对照来源。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category="quality"
                question={
                  <>{"\n              AI检测率怎么办？\n              "}</>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                说句实话：毕业季周期很长（一般9月到次年6月），这期间AI检测算法会持续更新，今天查10%、明天算法更新了可能变30%，这是没法避免的行业共性问题。但放心，我们最终保证定稿时重复率、AI检测率按学校要求的标准达标——哪怕高0.1%，我们都尽快改。注意：普通降重不含降AI检测率，学校要求AI率达标的请提前说，我们写作时特别注意；定稿后要专门降AI率的，属于额外服务，另沟通报价。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category="quality"
                question={
                  <>{"\n              修改不满意怎么办？\n              "}</>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                范围内的问题3轮以内免费改，收到你完整的修改意见后2天内改完。想改得又快又准，修改意见要这样给：整理成文档或在文章里加批注，按「1.第X章第X节第X段，把XX改成XX」的格式标清序号和位置，一次性列完；尽量别发语音、别只发截图——语音和截图没法逐条登记，容易漏改。说句实在话：修改不是所有问题都能100%改好——有些问题我们直接改好，有些教你应对导师，有些不合理要求可以跟导师推掉；实在改不了的，我们会给理由和替代建议。建议先给导师看再改，导师意见才最权威。对处理结果有异议，随时找负责人沟通，我们认真处理。\n              "
                  }
                </div>
              </Accordion>

              <Accordion
                category="after"
                question={
                  <>{"\n              交了钱没人管怎么办？\n              "}</>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                这一点不靠自觉、靠机制，不会出现这种情况：每个客户我们都建专属服务群，群里就你、前端咨询顾问、辅导老师三个人。前端客服团队10人以上，经过专业培训、熟悉全流程规则，你有任何问题先找前端顾问，需要专业处理的再拉辅导老师。从开题到答辩结束全程跟进，不是交完稿就不管了；我们主动推进、主动同步进度，不用你天天问「做到哪了」。要是超过3天没收到我们任何消息，你可以在群里问，我们跟你说进度。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category="after"
                question={<>{"\n              售后管多久？\n              "}</>}
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                售后从终稿交付那天算，到你答辩结束，一般不超30天，具体以你答辩时间为准。答辩通过后售后结束，服务群保留7天，7天后解散（好友保留，后面有需要随时联系）。学校有二次审核、盲审、往届抽查等后续要求、超出售后时限的，另沟通费用。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category="after"
                question={
                  <>
                    {"\n              哪些售后免费？哪些收费？\n              "}
                  </>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                免费的：格式微调（字体字号行距页码这些小调整）、错别字修改、答辩问题解答（论文内容相关疑问）、小范围内容调整（不超全文10%）、答辩PPT框架建议和常见问题预判。收费的：大段重写、换研究方向、加章节、导师要求整体重构、二次降重（你大改后重复率回升）、完整答辩PPT制作、模拟答辩多次（免费1次）、超出售后时限的任何修改。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category="after"
                question={
                  <>{"\n              回复速度怎么样？\n              "}</>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                每天9:00-22:00，消息2小时内肯定回，看到先回一句「收到」，不让你等；22点之后的消息，第二天上午10点前回；答辩旺季（2月15日—5月20日）单多，回复可能略延迟，但当天肯定回、不会不理你。修改时效：常规修改2天内完成（从收到完整修改意见算起）；答辩前3天的加急修改24小时内完成，优先处理。两轮修改之间最少留 24 小时，保证每轮改到位。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category="after"
                question={
                  <>
                    {"\n              答辩前紧张，有辅导吗？\n              "}
                  </>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                有，而且都是免费的：PPT框架建议（章节结构、每页重点、时间分配）；常见问题预判——根据你的题目和内容预判10-15个答辩老师可能问的问题，附回答思路；答辩话术指导（开场怎么说、被问住了怎么救场、老师挑刺怎么回应、结束怎么致谢）；注意事项提醒（着装、礼仪、时间控制、PPT播放、打印份数）；还有免费1次模拟答辩，我们当老师问你问题，帮你演练，上场一点不慌。\n              "
                  }
                </div>
              </Accordion>

              <Accordion
                category="privacy"
                question={
                  <>{"\n              论文会泄露吗？\n              "}</>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                不会。你的论文内容只用于为你提供辅导服务，不会用于其他用途，不会公开发表，未经你同意不会向任何第三方泄露。服务结束后，你的文件在我们系统保留一段时间（用于售后），之后安全删除。也提醒你自己保护好论文：别随便发给同学或上传公共平台，避免被人抄袭导致你自己查重率升高。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category="privacy"
                question={
                  <>
                    {"\n              会拿我的论文当案例吗？\n              "}
                  </>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                不会，除非你书面同意。客户论文不作为案例展示是写进服务说明里的硬规则。另外明确一下知识产权：最终论文的作者署名权归你本人，你是论文唯一作者；我们提供的辅导内容（写作思路、框架建议、修改意见等），你付费后获得使用权，用于完成自己的毕业论文/设计。\n              "
                  }
                </div>
              </Accordion>
              <Accordion
                category="privacy"
                question={
                  <>{"\n              个人信息安全吗？\n              "}</>
                }
              >
                <div className="faq-item__a-inner">
                  {
                    "\n                安全。我们严格保护你的个人信息，包括姓名、学校、专业、联系方式、论文内容等，未经你同意不会向任何第三方泄露。服务全程在专属服务群里进行，全程有记录、可追溯；群里也有规矩：任何人不私自加好友，别拉无关的人进群，从机制上避免信息外流。\n              "
                  }
                </div>
              </Accordion>
            </div>
          </div>
        </section>

        <section className="section cta-section" id="faq-cta">
          <div
            className="hero__deco hero__deco--circle1"
            aria-hidden="true"
          ></div>
          <div className="container">
            <div className="cta-inner">
              <div className="reveal">
                <h2>{"还有别的疑问？扫宣传单联系码直接问"}</h2>
                <p>
                  {
                    "咨询不收费、不催单，随便问。把你的专业、学校要求、时间告诉我们，当天就能给你出方案和报价。工作时间每天9:00-22:00，消息2小时内肯定回。"
                  }
                </p>
                <p style={{ marginTop: "16px" }}>
                  <button
                    type="button"
                    className="btn btn--accent btn--lg"
                    data-open-modal="qrcode-modal"
                  >
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-chat"></use>
                    </svg>
                    {"\n                扫码问一句（不收费）\n              "}
                  </button>
                </p>
              </div>
              <div className="cta-qrcode-box reveal">
                <img
                  src="/images/zhiyu-qrcode.png"
                  alt="知瑜网络自媒体账号整合展示二维码"
                  width="160"
                  height="160"
                  loading="lazy"
                />
                <span>{"自媒体账号整合展示 · 欢迎关注"}</span>
                <span
                  style={{
                    display: "block",
                    fontSize: ".82rem",
                    opacity: ".9",
                    marginTop: "6px",
                  }}
                >
                  {"咨询、下单请扫宣传单（宣传页）上的联系二维码"}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </FaqProvider>
  );
}
