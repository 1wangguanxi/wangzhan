export default function ServicesPage() {
  return (
    <main>
      <section className="hero">
        <div
          className="hero__deco hero__deco--circle1"
          aria-hidden="true"
        ></div>
        <div
          className="hero__deco hero__deco--circle2"
          aria-hidden="true"
        ></div>
        <div className="hero__deco hero__deco--ring" aria-hidden="true"></div>
        <div className="container">
          <div className="hero__content">
            <p className="hero__badge">
              <span className="dot" aria-hidden="true"></span>
              {"八项服务 · 一站式辅导"}
            </p>
            <h1>
              {"八项服务，"}
              <span className="hl">{"从选题到答辩"}</span>
              {"全覆盖"}
            </h1>
            <p className="hero__sub">
              {
                "选题没方向、初稿被导师打回、查重降不下去——论文卡在哪一步，我们就从哪一步帮你。可以整套辅导，也可以只选其中一两项，每一项的内容和边界都说得清清楚楚。"
              }
            </p>

            <p className="svc-notice reveal" role="note">
              <svg className="icon" aria-hidden="true">
                <use href="#icon-clock"></use>
              </svg>
              <span>
                {"当前可正常咨询下单。"}
                <strong>{"每年2月15日—5月20日为旺季"}</strong>
                {
                  "，单多修改集中，建议尽早下单、留足修改时间，别挤进 5 月的修改高峰。"
                }
              </span>
            </p>
            <div className="hero__actions">
              <button
                type="button"
                className="btn btn--accent btn--lg"
                data-open-modal="qrcode-modal"
              >
                <svg className="icon" aria-hidden="true">
                  <use href="#icon-chat"></use>
                </svg>
                {"扫宣传单联系码咨询，避开旺季再下单"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="services-list" aria-label="八项服务详解">
        <div className="container">
          <div className="svc-layout">
            <aside className="svc-nav-wrap">
              <nav className="svc-nav" aria-label="服务目录">
                <p className="svc-nav__title">{"服务目录"}</p>
                <ul>
                  <li>
                    <a data-spy="topic" href="#topic">
                      <svg className="icon" aria-hidden="true">
                        <use href="#icon-target"></use>
                      </svg>
                      {"选题指导"}
                    </a>
                  </li>
                  <li>
                    <a data-spy="proposal" href="#proposal">
                      <svg className="icon" aria-hidden="true">
                        <use href="#icon-doc"></use>
                      </svg>
                      {"开题报告"}
                    </a>
                  </li>
                  <li>
                    <a data-spy="outline" href="#outline">
                      <svg className="icon" aria-hidden="true">
                        <use href="#icon-tree"></use>
                      </svg>
                      {"大纲搭建"}
                    </a>
                  </li>
                  <li>
                    <a data-spy="writing" href="#writing">
                      <svg className="icon" aria-hidden="true">
                        <use href="#icon-pen"></use>
                      </svg>
                      {"正文辅导"}
                    </a>
                  </li>
                  <li>
                    <a data-spy="revise" href="#revise">
                      <svg className="icon" aria-hidden="true">
                        <use href="#icon-refresh"></use>
                      </svg>
                      {"修改润色"}
                    </a>
                  </li>
                  <li>
                    <a data-spy="plagiarism" href="#plagiarism">
                      <svg className="icon" aria-hidden="true">
                        <use href="#icon-shield"></use>
                      </svg>
                      {"查重降重"}
                    </a>
                  </li>
                  <li>
                    <a data-spy="format" href="#format">
                      <svg className="icon" aria-hidden="true">
                        <use href="#icon-layout"></use>
                      </svg>
                      {"格式排版"}
                    </a>
                  </li>
                  <li>
                    <a data-spy="defense" href="#defense">
                      <svg className="icon" aria-hidden="true">
                        <use href="#icon-present"></use>
                      </svg>
                      {"答辩准备"}
                    </a>
                  </li>
                </ul>
                <button
                  type="button"
                  className="btn btn--accent btn--sm svc-nav__cta"
                  data-open-modal="qrcode-modal"
                >
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-chat"></use>
                  </svg>
                  {"\n                扫宣传单联系码咨询报价\n              "}
                </button>
              </nav>
            </aside>

            <div className="svc-content">
              <section
                className="svc-detail reveal"
                id="topic"
                aria-labelledby="topic-title"
              >
                <div className="svc-detail__head">
                  <span className="svc-detail__icon">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-target"></use>
                    </svg>
                  </span>
                  <div className="svc-detail__titlebox">
                    <p className="svc-detail__no">{"服务 01"}</p>
                    <h2 id="topic-title">{"选题指导"}</h2>
                  </div>
                  <span className="svc-detail__time">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-clock"></use>
                    </svg>
                    {"当天给方向"}
                  </span>
                </div>
                <p className="svc-detail__desc">
                  {
                    "题目选得好，后面一切都顺。这是经验之谈：开题定的研究方向、研究方法、技术路线，直接决定后面正文的难度。我们会根据你的专业、能力和导师要求，推荐难度适中、好写好过的题目和方向——别为了显得厉害选特别难的，后面哭的是你自己。"
                  }
                </p>
                <div className="svc-detail__cols">
                  <div className="svc-box svc-box--include">
                    <h3>{"服务包含"}</h3>
                    <ul className="svc-list svc-list--check">
                      <li>{"分析你的专业方向和导师偏好，圈定可选范围"}</li>
                      <li>{"推荐 3 个左右备选题目，附推荐理由和写作思路"}</li>
                      <li>
                        {"评估每个题目的难度：数据好不好找、实验好不好做"}
                      </li>
                      <li>{"避开太偏、太旧、重复率容易高的「坑题」"}</li>
                      <li>{"给你跟导师汇报选题的沟通建议"}</li>
                    </ul>
                  </div>
                  <div className="svc-box svc-box--exclude">
                    <h3>{"不包含"}</h3>
                    <ul className="svc-list svc-list--cross">
                      <li>
                        {
                          "替你拍板定题（最终是导师说了算，自己定了不给导师看一眼，后面容易白做）"
                        }
                      </li>
                      <li>
                        {
                          "开题确认后免费换题（之前做的作废，新题从头来，需重新评估）"
                        }
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="svc-qa">
                  <p>
                    <strong>{"问：选题为什么不能选难的？"}</strong>
                    <br />
                    {
                      "答：开题做太复杂、太前沿，后面正文写起来特别费劲——数据不好找、实验不好做、导师还可能挑毛病。我们推荐的是「好写好过」的题目，顺利毕业才是目标。"
                    }
                  </p>
                  <p>
                    <strong>{"问：我已经有题目了，还能找你们吗？"}</strong>
                    <br />
                    {
                      "答：可以。我们可以帮你评估现有题目的可行性和写作思路，题目定了就直接进开题阶段。"
                    }
                  </p>
                </div>
              </section>

              <section
                className="svc-detail svc-detail--flip reveal"
                id="proposal"
                aria-labelledby="proposal-title"
              >
                <div className="svc-detail__head">
                  <span className="svc-detail__icon">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-doc"></use>
                    </svg>
                  </span>
                  <div className="svc-detail__titlebox">
                    <p className="svc-detail__no">{"服务 02"}</p>
                    <h2 id="proposal-title">{"开题报告"}</h2>
                  </div>
                  <span className="svc-detail__time">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-clock"></use>
                    </svg>
                    {"2-3 天"}
                  </span>
                </div>
                <p className="svc-detail__desc">
                  {
                    "按学校模板来做，内容完整、逻辑清楚、格式规范，正常 2-3 天搞定。开题默认 2000 字左右，够学校要求就行；任务书学校要的话一并做好。一句经验：开题不建议做太难——做难了，后面正文受罪的是自己。"
                  }
                </p>
                <div className="svc-detail__cols">
                  <div className="svc-box svc-box--include">
                    <h3>{"服务包含"}</h3>
                    <ul className="svc-list svc-list--check">
                      <li>{"研究背景、研究意义、国内外研究现状"}</li>
                      <li>{"研究内容、研究方法、技术路线"}</li>
                      <li>{"进度安排和参考文献"}</li>
                      <li>{"严格按学校 Word 模板排版（模板请提前发我们）"}</li>
                      <li>{"默认 2000 字左右；任务书同步完成"}</li>
                    </ul>
                  </div>
                  <div className="svc-box svc-box--exclude">
                    <h3>{"不包含"}</h3>
                    <ul className="svc-list svc-list--cross">
                      <li>
                        {
                          "超过 2000 字的部分（学校要求特别多或你要求写很长的，超出部分补成本费）"
                        }
                      </li>
                      <li>
                        {
                          "导师细碎意见的全包修改（这类小调整建议你自己改，更快更对导师口味）"
                        }
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="svc-qa">
                  <p>
                    <strong>{"问：为什么开题的导师意见建议自己改？"}</strong>
                    <br />
                    {
                      "答：说句实在话，开题这东西每个学校、每个导师要求都不太一样，导师的意见往往很细碎（「这里再补充点」「那个换个说法」）。都是小调整，你改起来更快，也更符合你导师的口味；实在改不了的再找我们。"
                    }
                  </p>
                  <p>
                    <strong>{"问：开题确认后多久开始写正文？"}</strong>
                    <br />
                    {"答：开题确认后 3 天左右启动正文，不会让你等太久。"}
                  </p>
                </div>
              </section>

              <section
                className="svc-detail reveal"
                id="outline"
                aria-labelledby="outline-title"
              >
                <div className="svc-detail__head">
                  <span className="svc-detail__icon">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-tree"></use>
                    </svg>
                  </span>
                  <div className="svc-detail__titlebox">
                    <p className="svc-detail__no">{"服务 03"}</p>
                    <h2 id="outline-title">{"大纲搭建"}</h2>
                  </div>
                  <span className="svc-detail__time">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-clock"></use>
                    </svg>
                    {"1-2 天"}
                  </span>
                </div>
                <p className="svc-detail__desc">
                  {
                    "大纲是全文的地基，这一步很重要——大纲定了，后面正文就按这个写。我们把章节框架搭到三级标题，每一章、每一节写什么都列清楚，发你和导师确认后再动笔，避免写完才发现方向跑偏。"
                  }
                </p>
                <div className="svc-detail__cols">
                  <div className="svc-box svc-box--include">
                    <h3>{"服务包含"}</h3>
                    <ul className="svc-list svc-list--check">
                      <li>{"完整章节框架，详细到三级标题"}</li>
                      <li>{"每章每节的写作要点说明"}</li>
                      <li>{"按约稿字数做各章字数分配建议"}</li>
                      <li>{"数据分析、图表、案例在框架中的位置规划"}</li>
                      <li>{"确认后作为正文写作辅导的正式依据"}</li>
                    </ul>
                  </div>
                  <div className="svc-box svc-box--exclude">
                    <h3>{"不包含"}</h3>
                    <ul className="svc-list svc-list--cross">
                      <li>
                        {
                          "大纲确认后加章节、删章节、整体重构框架（算新需求，另评估）"
                        }
                      </li>
                      <li>{"大纲确认后更换研究方向、研究方法、技术路线"}</li>
                    </ul>
                  </div>
                </div>
                <div className="svc-qa">
                  <p>
                    <strong>{"问：大纲确认后还能改吗？"}</strong>
                    <br />
                    {
                      "答：小措辞调整没问题；但加减章节、换方向属于框架级改动，相当于重新构思全文，需要重新评估费用和时间。所以确认前建议先给导师看一眼，最终是导师说了算。"
                    }
                  </p>
                </div>
              </section>

              <section
                className="svc-detail svc-detail--flip reveal"
                id="writing"
                aria-labelledby="writing-title"
              >
                <div className="svc-detail__head">
                  <span className="svc-detail__icon">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-pen"></use>
                    </svg>
                  </span>
                  <div className="svc-detail__titlebox">
                    <p className="svc-detail__no">{"服务 04"}</p>
                    <h2 id="writing-title">{"正文辅导"}</h2>
                  </div>
                  <span className="svc-detail__time">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-clock"></use>
                    </svg>
                    {"初稿 5-10 天"}
                  </span>
                </div>
                <p className="svc-detail__desc">
                  {
                    "按确认好的大纲进行全文写作辅导，内容充实、逻辑通顺，符合专业要求和学术规范。初稿 5-10 天交付，具体看字数和专业难度。每一篇交付前都经过辅导老师自审、交叉审核、主理人抽检三道关卡。"
                  }
                </p>
                <div className="svc-detail__cols">
                  <div className="svc-box svc-box--include">
                    <h3>{"服务包含"}</h3>
                    <ul className="svc-list svc-list--check">
                      <li>{"按确认大纲完成全文写作辅导"}</li>
                      <li>{"图表、公式、代码片段按需编排进正文"}</li>
                      <li>{"数据分析类按论点需要配置合理数据"}</li>
                      <li>{"三级审核：自审 → 交叉审核 → 主理人抽检"}</li>
                      <li>{"初稿交付后按修改规则继续跟进到定稿"}</li>
                    </ul>
                  </div>
                  <div className="svc-box svc-box--exclude">
                    <h3>{"不包含"}</h3>
                    <ul className="svc-list svc-list--cross">
                      <li>
                        {
                          "设计类/艺术类的设计作品、效果图制作（论文部分我们负责，作品本身另议）"
                        }
                      </li>
                      <li>
                        {
                          "软件类一整套可运行程序的开发（核心设计部分可写进论文，整套程序另议）"
                        }
                      </li>
                      <li>
                        {
                          "真实企业内部数据来源（涉及知识产权与重复率，数据按论点合理配置）"
                        }
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="svc-qa">
                  <p>
                    <strong>{"问：软件工程专业没有程序怎么办？"}</strong>
                    <br />
                    {
                      "答：论文写作中我们会根据实际设计编写核心设计部分放进论文。但要一整套可运行程序的，出于编程的复杂性和成本考虑，需要你自己负责程序部分或另行沟通；程序运行截图需要你自己运行截取，我们帮你加进文章。"
                    }
                  </p>
                  <p>
                    <strong>{"问：初稿是什么样的交付方式？"}</strong>
                    <br />
                    {
                      "答：初稿完成后先发带水印版本给你核对内容和质量，确认初稿并付尾款后，完整无水印文件开放下载。这是行业里保护双方的做法——你先核对满意再付尾款，我们的劳动也有保障，互相都踏实。"
                    }
                  </p>
                </div>
              </section>

              <section
                className="svc-detail reveal"
                id="revise"
                aria-labelledby="revise-title"
              >
                <div className="svc-detail__head">
                  <span className="svc-detail__icon">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-refresh"></use>
                    </svg>
                  </span>
                  <div className="svc-detail__titlebox">
                    <p className="svc-detail__no">{"服务 05"}</p>
                    <h2 id="revise-title">{"修改润色"}</h2>
                  </div>
                  <span className="svc-detail__time">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-clock"></use>
                    </svg>
                    {"每轮 2 天"}
                  </span>
                </div>
                <p className="svc-detail__desc">
                  {
                    "收到你完整的修改意见后 2 天内改完一轮。一般从初稿到终稿，平均 3 轮修改内能搞定，3 轮以内的问题免费改。每次改完我们会在群里说清楚这次改了哪些地方，方便你核对。"
                  }
                </p>
                <div className="svc-detail__cols">
                  <div className="svc-box svc-box--include">
                    <h3>{"服务包含（同时满足 4 个条件免费改）"}</h3>
                    <ul className="svc-list svc-list--check">
                      <li>
                        {"在已确认的大纲、开题、初稿范围内，不是新增内容"}
                      </li>
                      <li>
                        {"是我们的问题：内容错了、逻辑不通、格式不对、错别字"}
                      </li>
                      <li>{"单轮修改量不超过全文 20%，不是大段重写"}</li>
                      <li>{"初稿交付后 3 轮修改以内"}</li>
                      <li>{"每轮修改附修改说明，历史版本存档可随时回看"}</li>
                      <li>{"每位客户 1 次免费加急机会（看老师排期）"}</li>
                    </ul>
                  </div>
                  <div className="svc-box svc-box--exclude">
                    <h3>{"不包含（这些情况需另评估）"}</h3>
                    <ul className="svc-list svc-list--cross">
                      <li>{"换题目、换研究方向/方法、加减章节"}</li>
                      <li>{"单轮修改量超全文 20% 或整章重写"}</li>
                      <li>
                        {
                          "导师提之前没涉及的全新要求（必须加实验、必须做仿真等）"
                        }
                      </li>
                      <li>{"初稿交付后第 4 轮起的修改"}</li>
                    </ul>
                  </div>
                </div>
                <div className="svc-qa">
                  <p>
                    <strong>{"问：修改意见怎么给才改得快？"}</strong>
                    <br />
                    {
                      "答：一定整理清楚再发——按序号标好（第 1 条、第 2 条……），按章节顺序来，格式如「1.第2章第3节第2段，把XX改成XX」。建议别发语音、尽量别只发截图——语音和长截图没法逐条登记，容易漏。你写得越清楚，我们改得越快越准；发了的我们都会登记，放心。"
                    }
                  </p>
                  <p>
                    <strong>{"问：导师意见和自己想法不一致听谁的？"}</strong>
                    <br />
                    {
                      "答：建议所有稿件先给导师看，等导师提意见了再让我们改。最终是导师审核，导师意见才最权威——你先按自己想法改了，导师看了又说不对，等于白改。"
                    }
                  </p>
                </div>
              </section>

              <section
                className="svc-detail svc-detail--flip reveal"
                id="plagiarism"
                aria-labelledby="plagiarism-title"
              >
                <div className="svc-detail__head">
                  <span className="svc-detail__icon">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-shield"></use>
                    </svg>
                  </span>
                  <div className="svc-detail__titlebox">
                    <p className="svc-detail__no">{"服务 06"}</p>
                    <h2 id="plagiarism-title">{"查重降重"}</h2>
                  </div>
                  <span className="svc-detail__time">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-clock"></use>
                    </svg>
                    {"1-2 天"}
                  </span>
                </div>
                <p className="svc-detail__desc">
                  {
                    "降重是含在服务里的：定稿后免费降重 1 次，人工改写不是机器替换，降到学校要求以下。我们承诺的是定稿时重复率达标——哪怕高 0.1%，我们都尽快改。"
                  }
                </p>
                <div className="svc-detail__cols">
                  <div className="svc-box svc-box--include">
                    <h3>{"服务包含"}</h3>
                    <ul className="svc-list svc-list--check">
                      <li>
                        {"免费查重软件（PaperPass、PaperYY 等）报告供参考"}
                      </li>
                      <li>{"按学校指定的查重软件针对性降重 1 次（免费）"}</li>
                      <li>{"人工改写降重，保证语句通顺、不改变原意"}</li>
                      <li>{"定稿时重复率保证降到学校要求以下"}</li>
                    </ul>
                  </div>
                  <div className="svc-box svc-box--exclude">
                    <h3>{"不包含"}</h3>
                    <ul className="svc-list svc-list--cross">
                      <li>
                        {
                          "官方查重费用（知网/维普/万方官方查重你自己购买，报价不含官方查重费）"
                        }
                      </li>
                      <li>
                        {
                          "降 AI 检测率（降重不含降 AI，学校有要求的提前说，专项另报价）"
                        }
                      </li>
                      <li>
                        {"二次降重（第一次达标后你又大改导致重复率回升的情况）"}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="svc-qa">
                  <p>
                    <strong>{"问：可以初稿就先查一次吗？"}</strong>
                    <br />
                    {
                      "答：不建议。初稿还会反复改，这时候查的重复率没参考价值，改完重复率会变。一定要定稿后再查，内容最终确定了再查，一次降到位。"
                    }
                  </p>
                  <p>
                    <strong>{"问：降重要提供什么？"}</strong>
                    <br />
                    {
                      "答：给完整查重报告（PDF 版，含详细对照和标红），尽量别只发截图——截图看不全对照来源。完整报告能帮我们精准定位重复内容、高效降重。"
                    }
                  </p>
                </div>
              </section>

              <section
                className="svc-detail reveal"
                id="format"
                aria-labelledby="format-title"
              >
                <div className="svc-detail__head">
                  <span className="svc-detail__icon">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-layout"></use>
                    </svg>
                  </span>
                  <div className="svc-detail__titlebox">
                    <p className="svc-detail__no">{"服务 07"}</p>
                    <h2 id="format-title">{"格式排版"}</h2>
                  </div>
                  <span className="svc-detail__time">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-clock"></use>
                    </svg>
                    {"1-2 天"}
                  </span>
                </div>
                <p className="svc-detail__desc">
                  {
                    "按学校格式要求全面调整，一次到位。格式这事看着小，被退回来返工最闹心——所以请把学校的格式要求和模板提前发我们；内容完成后才给格式要求的，就得重新排一遍，没法再免费。"
                  }
                </p>
                <div className="svc-detail__cols">
                  <div className="svc-box svc-box--include">
                    <h3>{"服务包含"}</h3>
                    <ul className="svc-list svc-list--check">
                      <li>{"封面、原创性声明、目录自动生成"}</li>
                      <li>{"字体、字号、行距、页边距、页眉页脚、页码"}</li>
                      <li>{"参考文献著录格式（按学校要求标准）"}</li>
                      <li>{"图表编号、公式格式、章节标题层级"}</li>
                      <li>{"售后期内格式微调（小调整免费）"}</li>
                    </ul>
                  </div>
                  <div className="svc-box svc-box--exclude">
                    <h3>{"不包含"}</h3>
                    <ul className="svc-list svc-list--cross">
                      <li>{"学校突然换模板导致整体重排（非我们原因）"}</li>
                      <li>{"你反复变更格式要求超过 2 次"}</li>
                    </ul>
                  </div>
                </div>
                <div className="svc-qa">
                  <p>
                    <strong>{"问：排版需要我提供什么？"}</strong>
                    <br />
                    {
                      "答：学校的格式要求文件（字体字号页边距行距页眉页脚参考文献格式这些）请提前发我们，有 Word 模板更好。个人信息（姓名、学号、导师、学院）你自己填自己核对，我们只做辅导，不负责填你的个人信息。"
                    }
                  </p>
                </div>
              </section>

              <section
                className="svc-detail svc-detail--flip reveal"
                id="defense"
                aria-labelledby="defense-title"
              >
                <div className="svc-detail__head">
                  <span className="svc-detail__icon">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-present"></use>
                    </svg>
                  </span>
                  <div className="svc-detail__titlebox">
                    <p className="svc-detail__no">{"服务 08"}</p>
                    <h2 id="defense-title">{"答辩准备"}</h2>
                  </div>
                  <span className="svc-detail__time">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-clock"></use>
                    </svg>
                    {"1 天"}
                  </span>
                </div>
                <p className="svc-detail__desc">
                  {
                    "终稿完成后，答辩辅导免费跟上，直到你答辩结束。答辩是你自己上场，我们能做的是帮你把问题都预判到、把回答思路理顺，让你心里有底、上场不慌。"
                  }
                </p>
                <div className="svc-detail__cols">
                  <div className="svc-box svc-box--include">
                    <h3>{"服务包含"}</h3>
                    <ul className="svc-list svc-list--check">
                      <li>{"PPT 框架建议：章节结构、每页重点、时间分配"}</li>
                      <li>{"预判 10-15 个答辩老师可能问的问题，附回答思路"}</li>
                      <li>
                        {
                          "答辩话术指导：开场怎么说、被问住怎么救场、老师挑刺怎么回应"
                        }
                      </li>
                      <li>{"注意事项提醒：着装、礼仪、时间控制、打印份数"}</li>
                      <li>{"免费模拟答辩 1 次，我们当老师问你问题帮你演练"}</li>
                    </ul>
                  </div>
                  <div className="svc-box svc-box--exclude">
                    <h3>{"不包含"}</h3>
                    <ul className="svc-list svc-list--cross">
                      <li>
                        {"完整答辩 PPT 制作（要我们完整做 PPT 的另收费）"}
                      </li>
                      <li>{"第 2 次起的模拟答辩（免费 1 次，多次另议）"}</li>
                    </ul>
                  </div>
                </div>
                <div className="svc-qa">
                  <p>
                    <strong>{"问：答辩被问住了怎么办？"}</strong>
                    <br />
                    {
                      "答：话术指导里专门有「救场」这一项——怎么诚实应对、怎么把问题引回你熟悉的部分，模拟答辩时都会带你练。论文内容相关的疑问，售后期内随时在群里问。"
                    }
                  </p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--gray" id="pricing">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-tag">{"价格说明"}</span>
            <h2>{"明码标价，没有隐形消费"}</h2>
            <p className="section-desc">{"先说清楚怎么定价，后面少误会。"}</p>
          </div>
          <div className="price-note reveal">
            <span className="price-note__icon">
              <svg className="icon" aria-hidden="true">
                <use href="#icon-tag"></use>
              </svg>
            </span>
            <div className="price-note__body">
              <p>
                {"价格根据"}
                <strong>{"专业、字数、题目难度、截止时间"}</strong>
                {
                  "综合定价，本科论文一般几百到一千多。我们没有大机构的层层溢价，明码标价，没有隐形消费。"
                }
              </p>
              <p>
                {
                  "费用分定金和尾款：下单时付定金（一般总价 50%），初稿确认后付尾款。每一分钱花在哪都清清楚楚，扫宣传单联系码咨询直接报实在价——报价不合适不收费，咨询不催单，觉得合适再下单。退款也有明白规则：服务没开始定金全退，进行中按服务进度比例退款，具体比例和计算方式签约时写进协议。"
                }
              </p>
              <p className="price-note__action">
                <button
                  type="button"
                  className="btn btn--accent btn--lg"
                  data-open-modal="qrcode-modal"
                >
                  <svg className="icon" aria-hidden="true">
                    <use href="#icon-chat"></use>
                  </svg>
                  {"\n                扫宣传单联系码 报实在价\n              "}
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="packages">
        <div className="container">
          <div className="section-head reveal">
            <span className="section-tag">{"套餐对比"}</span>
            <h2>{"三种合作方式，按需选择"}</h2>
            <p className="section-desc">
              {
                "可以只买单项，也可以全文托管。不确定选哪种，扫码说说情况，我们帮你推荐。"
              }
            </p>
          </div>

          <p className="pkg-scroll-hint" aria-hidden="true">
            <svg className="icon">
              <use href="#icon-arrow-right"></use>
            </svg>
            {"\n          左右滑动查看完整对比表\n        "}
          </p>
          <div className="pkg-table-wrap reveal">
            <table className="pkg-table">
              <caption className="sr-only">
                {"基础版、标准版、尊享版三种套餐的服务内容对比"}
              </caption>
              <thead>
                <tr>
                  <th scope="col">{"对比项"}</th>
                  <th scope="col">
                    {"基础版"}
                    <span className="pkg-sub">{"单项服务"}</span>
                  </th>
                  <th scope="col" className="pkg-col--hot">
                    {"标准版"}
                    <span className="pkg-sub">{"全文辅导 · 最多人选"}</span>
                  </th>
                  <th scope="col">
                    {"尊享版"}
                    <span className="pkg-sub">{"全程托管"}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{"选题指导"}</th>
                  <td>{"可单独购买"}</td>
                  <td className="pkg-yes">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-check"></use>
                    </svg>
                    <span className="sr-only">{"包含"}</span>
                  </td>
                  <td className="pkg-yes">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-check"></use>
                    </svg>
                    <span className="sr-only">{"包含"}</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">{"开题报告"}</th>
                  <td>{"可单独购买"}</td>
                  <td className="pkg-yes">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-check"></use>
                    </svg>
                    <span className="sr-only">{"包含"}</span>
                  </td>
                  <td className="pkg-yes">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-check"></use>
                    </svg>
                    <span className="sr-only">{"包含"}</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">{"大纲搭建"}</th>
                  <td>{"可单独购买"}</td>
                  <td className="pkg-yes">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-check"></use>
                    </svg>
                    <span className="sr-only">{"包含"}</span>
                  </td>
                  <td className="pkg-yes">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-check"></use>
                    </svg>
                    <span className="sr-only">{"包含"}</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">{"正文辅导"}</th>
                  <td>{"可单独购买"}</td>
                  <td className="pkg-yes">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-check"></use>
                    </svg>
                    <span className="sr-only">{"包含"}</span>
                  </td>
                  <td className="pkg-yes">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-check"></use>
                    </svg>
                    <span className="sr-only">{"包含"}</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">{"修改轮次"}</th>
                  <td>{"按单项规则"}</td>
                  <td>{"3 轮内免费"}</td>
                  <td>{"3 轮内免费 · 加急优先"}</td>
                </tr>
                <tr>
                  <th scope="row">{"查重降重"}</th>
                  <td>{"可单独购买"}</td>
                  <td>{"免费降重 1 次"}</td>
                  <td>{"免费降重 1 次"}</td>
                </tr>
                <tr>
                  <th scope="row">{"格式排版"}</th>
                  <td>{"可单独购买"}</td>
                  <td className="pkg-yes">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-check"></use>
                    </svg>
                    <span className="sr-only">{"包含"}</span>
                  </td>
                  <td className="pkg-yes">
                    <svg className="icon" aria-hidden="true">
                      <use href="#icon-check"></use>
                    </svg>
                    <span className="sr-only">{"包含"}</span>
                  </td>
                </tr>
                <tr>
                  <th scope="row">{"答辩辅导"}</th>
                  <td>{"可单独购买"}</td>
                  <td>{"问题预判 + PPT 框架"}</td>
                  <td>{"问题预判 + PPT 框架"}</td>
                </tr>
                <tr>
                  <th scope="row">{"模拟答辩"}</th>
                  <td className="pkg-no">{"—"}</td>
                  <td>{"免费 1 次"}</td>
                  <td>{"免费 1 次"}</td>
                </tr>
                <tr>
                  <th scope="row">{"适合人群"}</th>
                  <td>
                    {"只需局部帮助"}
                    <br />
                    {"（如只降重、只排版）"}
                  </td>
                  <td>
                    {"从开题到定稿"}
                    <br />
                    {"需要全文辅导的同学"}
                  </td>
                  <td>
                    {"时间紧、要求高"}
                    <br />
                    {"希望全程有人盯单的同学"}
                  </td>
                </tr>
                <tr className="pkg-price-row">
                  <th scope="row">{"价格"}</th>
                  <td>{"说清情况当天报价"}</td>
                  <td className="pkg-col--hot">{"说清情况当天报价"}</td>
                  <td>{"说清情况当天报价"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="pkg-cta reveal">
            <button
              type="button"
              className="btn btn--accent btn--lg"
              data-open-modal="qrcode-modal"
            >
              <svg className="icon" aria-hidden="true">
                <use href="#icon-chat"></use>
              </svg>
              {"\n            扫码说说情况，帮你选套餐\n          "}
            </button>
          </p>
        </div>
      </section>

      <section className="section cta-section" id="contact">
        <div
          className="hero__deco hero__deco--circle1"
          aria-hidden="true"
        ></div>
        <div className="container">
          <div className="cta-inner">
            <div className="reveal">
              <h2>{"不知道选哪项？扫宣传单联系码聊聊"}</h2>
              <p>
                {
                  "把你的专业、学校要求、截止时间告诉我们，当天就能给你出方案和报价。咨询不收费、不催单，觉得合适再下单。"
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
                  {"\n                扫码帮我选服务\n              "}
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
  );
}
