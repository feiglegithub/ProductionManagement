<template>
  <div class="g-index">
    <!-- 头部 -->
    <x-header
      class="m-header"
      :left-options="{ backText: '' }"
      style="background-color: #22292c"
    >
      仓库原材料接收
      <!-- <a slot="right">取消</a> -->
      <a slot="right" @click="doPost" :class="{ 'f-noclick': showThost }"
        >提交</a
      >
    </x-header>
    <div class="f-flexvw f-flexg1 f-pdlr5">
      <div class="g-inp" style="min-height: 80px">
        <div class="m-inp f-mtb5">
          <span class="laber100" style="width: 30%">车间</span>
          <div
            @click="ShowWorkshop = true"
            class="m-selector"
            style="width: 70%"
          >
            <popup-picker
              :show.sync="ShowWorkshop"
              :data="WorkshopList"
              @on-change="changeWorkshop"
              value-text-align="left"
            ></popup-picker>
            <div>{{ ChoiceWorkshop }}</div>
          </div>
        </div>
        <div class="m-inp f-mtb5">
          <span class="laber100" style="width: 30%">大板标签/批次</span>
          <span class="inp s-inpbg" style="width: 70%">
            <input
              v-model="BoardLabel"
              ref="BoardLabelInp"
              placeholder="请扫描大板标签或输入批次"
              type="text"
              @keyup.enter="getBoardLabel()"
              class="s-inpbg"
            />
            <span
              class="iconfont icon-iconfontscan"
              @click="scanBarCode"
            ></span>
          </span>
        </div>
      </div>
      <div class="g-scrollbox">
        <div style="overflow-y: auto">
          <s-messageheader
            class="f-mt10"
            messagetitle="仓库信息"
            v-show="DataList.length >= 1"
          ></s-messageheader>
          <swipeout :class="{ 's-border': DataList.length >= 1 }">
            <swipeout-item
              v-for="(item, index) in DataList"
              :key="index"
              @on-close="handleEvents('on-close')"
              @on-open="handleEvents('on-open')"
              transition-mode="follow"
            >
              <div slot="right-menu" style="padding: 5px 0">
                <swipeout-button
                  @click.native="onButtonClick(index, item)"
                  type="warn"
                  >删除</swipeout-button
                >
              </div>
              <div slot="content" class="f-pd5 vux-1px-t">
                <div class="m-listbox">
                  <div class="num">
                    {{ index + 1 }}
                  </div>
                  <div class="showbox">
                    <div class="showlistmsg">
                      <span class="label">卡位:</span>
                      <span class="showmsg f-ml10">{{
                        item.WarehouseAreaNo
                      }}</span>
                    </div>
                    <div class="showlistmsg">
                      <span class="label">子批次:</span>
                      <span class="showmsg f-ml10">{{
                        item.SubBatchCode
                      }}</span>
                    </div>
                    <div class="showlistmsg">
                      <span class="label">任务号:</span>
                      <span class="showmsg f-ml10">{{ item.TaskNumber }}</span>
                    </div>
                    <div
                      v-for="(item2, index2) in item.LstPanelInfo"
                      :key="index2"
                    >
                      <div class="showlistmsg">
                        <span class="label">任务花色:</span>
                        <span class="showmsg f-ml10">{{
                          item2.TaskColor
                        }}</span>
                      </div>
                      <div class="showlistmsg">
                        <span class="inp .s-bgE7E7E7">
                          <span class="label"
                            >总大板数量:{{ item2.TotalPanelNum }}</span
                          >
                          <span class="label">可接收大板数量:</span>
                          <input
                            class="inp"
                            type="text"
                            name=""
                            id=""
                            v-model="item2.PdaReceivedPanelNum"
                          />
                        </span>
                      </div>
                    </div>
                    <!--<div class="showlistmsg">
                                            <span class="label">大板数量:</span>
                                            <span class="showmsg f-ml10">{{item.BoardQty}}</span>
                                        </div>-->
                  </div>
                </div>
              </div>
            </swipeout-item>
          </swipeout>
        </div>
      </div>
    </div>
    <s-confirm
      v-model="ShowConfirm"
      :content="ConfirmMsg"
      :showConfirmButton="false"
      :showCancelButton="false"
      :showSuccessButton="Successbtn"
      :showDangerButton="Dangerbtn"
      :bad="BadColor"
      @on-cancel="onCancel"
      @on-confirm="onConfirm"
    >
    </s-confirm>

    <toast
      width="20em"
      v-model="showPositionValue"
      type="text"
      :time="2500"
      :text="Msg"
      position="middle"
    ></toast>
    <loading :show="showThost" :text="loadingtitle"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "",
  data() {
    return {
      ConfigWorkshopStorageKey: "WarehouseMaterialWorkshopKey", //配置存储键
      ShowConfirm: false, //控制提示弹窗的显隐
      ConfirmMsg: "提交成功",
      BadColor: false,
      Successbtn: true,
      Dangerbtn: true,
      showPositionValue: false, //提示信息显隐
      Msg: "有问题", //提示信息
      showThost: false, //圈圈的显隐
      loadingtitle: "提交中", //圈圈文字

      ShowWorkshop: false, //控制车间弹窗的显隐
      ChoiceWorkshop: null, //选择的车间名称
      ChoiceWorkshopId: null, //选择的车间id
      WorkshopList: [[" "]], //显示的车间列表
      GetWorkshop: null, //接口获取车间的数据

      BoardLabel: null, //大板标签
      DataList: [], //显示的数据
    };
  },
  components: {},
  methods: {
    scanBarCode() {
      let that = this;
      console.log("调用扫描接口");
      this.$hybridApi.scanCode({
        success: function (res) {
          that.BoardLabel = res;
          that.getBoardLabel();
        },
      });
    },
    //选择某一项车间
    changeWorkshop(value) {
      let id = value[0];
      this.ChoiceWorkshopId = value[0];
      localStorage.setItem(
        this.ConfigWorkshopStorageKey,
        this.ChoiceWorkshopId
      );
      this.ChoiceWorkshop = this.GetWorkshop.find((item) => item.Id == id).Code;
      this.ChoiceResourceId = null;
      this.ChoiceResource = null;
    },
    //获取大板标签对应的数据
    getBoardLabel() {
      if (this.ChoiceWorkshopId == "" || this.ChoiceWorkshopId == null) {
        this.Msg = "请先选择车间";
        this.showPositionValue = true;
        return;
      }

      if (!this.BoardLabel) {
        this.showPositionValue = true;
        this.Msg = "大板标签/批次不能为空";
        return;
      }

      this.getWarehouseMaterialData(this.ChoiceWorkshopId, this.BoardLabel);
      console.log(this.BoardLabel);
    },
    //触发单项左右滑动
    handleEvents(type) {
      console.log(type);
    },
    //点击删除按钮，删除当前项
    onButtonClick(index, item) {
      console.log(index);
      console.log(item);
      this.DataList.splice(index, 1);
    },
    //点击提示弹窗的删除按钮
    onCancel() {
      this.ShowConfirm = false;
      this.ConfirmMsg = "";
      this.BadColor = false;
      this.Successbtn = false;
      this.Dangerbtn = false;
    },
    //点击提示弹窗的确认按钮
    onConfirm() {
      this.ShowConfirm = false;
      this.ConfirmMsg = "";
      this.BadColor = false;
      this.Successbtn = false;
      this.Dangerbtn = false;
    },
    //点击提交按钮
    doPost() {
      if (this.ChoiceWorkshopId == "" || this.ChoiceWorkshopId == null) {
        this.Msg = "请先选择车间";
        this.showPositionValue = true;
        return;
      }

      if (!this.DataList || this.DataList.length <= 0) {
        this.Msg = "提交数据不能为空";
        this.showPositionValue = true;
        return;
      }

      console.log(`${this.DataList}`);
      this.confirmWarehouseMaterialDetail(this.DataList);
    },
    //接口：获取车间数据接口
    async getCollectWorkshops() {
      this.loadingtitle = "加载中";
      this.showThost = true;
      await this.$axiosApi.getCollectWorkshops("", 0, 1).then((res) => {
        this.showThost = false;

        if (res.Success) {
          // console.log(res);
          this.GetWorkshop = res.Result.Datas;
          this.WorkshopList = [
            this.GetWorkshop.map((item) => {
              return { name: item.Code, value: item.Id };
            }),
          ];
        } else {
          this.showPositionValue = true;
          this.Msg = res.Message;
        }
      });
    },
    //接口：获取仓库材料数据
    getWarehouseMaterialData(departmentId, boardLabel) {
      this.loadingtitle = "加载中";
      this.showThost = true;

      this.$axiosApi
        .getWarehouseMaterialData(departmentId, boardLabel)
        .then((res) => {
          this.showThost = false;

          if (res.Success) {
            console.log(res);

            if (!!res.Result.WarehouseDetailList) {
              this.DataList = res.Result.WarehouseDetailList;
            }

            this.BoardLabel = null;
          } else {
            this.showPositionValue = true;
            this.Msg = res.Message;
            this.BoardLabel = null;
          }
        });
    },
    //接口：仓库原材料明细接收确认
    confirmWarehouseMaterialDetail(confirmDetails) {
      this.loadingtitle = "提交中";
      this.showThost = true;
      var detailIds = [];

      this.DataList.forEach((item, index) => {
        detailIds.push(item.DetailId);
      });

      this.$axiosApi
        .confirmWarehouseMaterialDetail(this.DataList)
        .then((res) => {
          this.showThost = false;

          if (res.Success) {
            console.log(res);
            this.ShowConfirm = true;
            this.ConfirmMsg = "提交成功";
            this.BadColor = false;
            this.Successbtn = true;
            this.Dangerbtn = false;
            this.DataList = [];
            this.$refs.BoardLabelInp.focus();
          } else {
            this.ShowConfirm = true;
            this.ConfirmMsg = res.Message;
            this.BadColor = true;
            this.Successbtn = false;
            this.Dangerbtn = true;
          }
        });
    },
    //获取存在本地的车间，并且判断之前存储的值是否在当前车间列表中存在，存在才赋值
    async judgeWorkshop() {
      await this.getCollectWorkshops();

      if (localStorage.getItem(this.ConfigWorkshopStorageKey)) {
        let newArr = this.GetWorkshop.filter((item) => {
          return item.Id == localStorage.getItem(this.ConfigWorkshopStorageKey);
        });

        if (newArr.length > 0) {
          this.ChoiceWorkshopId = localStorage.getItem(
            this.ConfigWorkshopStorageKey
          );
          this.ChoiceWorkshop = newArr[0].Code;
        }
      }
    },
    async controlExecutionOrder() {
      await this.judgeWorkshop();
    },
  },
  created() {
    this.controlExecutionOrder();
  },
  mounted() {
    this.$refs.BoardLabelInp.focus();
  },
};
</script>

<style lang="less">
</style>
