<template>
  <div>
    <x-header
      class="m-header"
      :left-options="{ backText: '' }"
      style="
        background-color: #22292c;
        position: fixed;
        top: 0px;
        width: 100%;
        z-index: 100;
      "
    >
      手机领料
      <a slot="right" @click="onCommit">提交</a>
    </x-header>

    <div class="contain1">
      <selector
        title="部门"
        v-model="departmentName"
        @click.native="onDepartmentSelectorClick"
      >
        <popup v-model="showDepartmentPopup" height="80%">
          <div style="margin: 5px">
            <el-input
              placeholder="请输入关键字"
              v-model="departmentKey"
              class="input-with-select"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="onSearchDepartment"
              ></el-button>
            </el-input>

            <group title="部门列表" class="popup-group">
              <radio
                :options="departments"
                v-model="departmentId"
                @on-change="onDepartmentChange"
              ></radio>
            </group>
          </div>
        </popup>
      </selector>

      <selector
        title="班组"
        v-model="teamName"
        @click.native="onTeamSelectorClick"
      >
        <popup v-model="showTeamPopup" height="80%">
          <div style="margin: 5px">
            <el-input
              placeholder="请输入关键字"
              v-model="teamKey"
              class="input-with-select"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="onSearchTeam"
              ></el-button>
            </el-input>

            <group title="班组列表" class="popup-group">
              <radio
                :options="teams"
                v-model="teamId"
                @on-change="onTeamChange"
              ></radio>
            </group>
          </div>
        </popup>
      </selector>

      <selector
        title="领料类型"
        v-model="typeName"
        @click.native="onTypeSelectorClick"
      >
        <popup v-model="showTypePopup" height="80%">
          <div style="margin: 5px">
            <el-input
              placeholder="请输入关键字"
              v-model="typeKey"
              class="input-with-select"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="onSearchType"
              ></el-button>
            </el-input>

            <group title="类型列表" class="popup-group">
              <radio
                :options="types"
                v-model="typeId"
                @on-change="onTypeChange"
              ></radio>
            </group>
          </div>
        </popup>
      </selector>

      <selector
        title="来源子库存"
        v-model="inventoryName"
        @click.native="onInventorySelectorClick"
      >
        <popup v-model="showInventoryPopup" height="80%">
          <div style="margin: 5px">
            <el-input
              placeholder="请输入关键字"
              v-model="inventoryKey"
              class="input-with-select"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="onSearchInventory"
              ></el-button>
            </el-input>

            <group title="子库存列表" class="popup-group">
              <radio
                :options="inventorys"
                v-model="inventory"
                @on-change="onInventoryChange"
              ></radio>
            </group>
          </div>
        </popup>
      </selector>

      <div class="divide">
        <span>领料清单</span>
        <x-button mini @click.native="onAddClick">添加</x-button>
      </div>
    </div>

    <swipeout class="vux-1px-tb">
      <swipeout-item
        transition-mode="follow"
        v-for="(item, index) in detailList"
        :key="index"
        style="margin-bottom: 1px"
      >
        <div slot="right-menu">
          <swipeout-button type="primary" @click.native="onDetailDelete(index)"
            >删除</swipeout-button
          >
        </div>
        <div slot="content" style="padding: 12px">
          <div>物料编码：{{ item.ItemCode }}</div>
          <div>物料名称：{{ item.name }}</div>
          <div>申请数量：{{ item.ApplyNum }}</div>
        </div>
      </swipeout-item>
    </swipeout>

    <popup v-model="showDetailPopup" height="85%">
      <popup-header
        left-text="取消"
        right-text="确定"
        title="选择物料"
        :show-bottom-border="false"
        @on-click-left="showDetailPopup = false"
        @on-click-right="onDetailCheckSure()"
      ></popup-header>

      <div style="margin: 5px">
        <el-input
          placeholder="请输入关键字"
          v-model="detailKey"
          class="input-with-select"
          clearable
        >
          <!-- <el-button
            slot="append"
            icon="el-icon-search"
            @click="onSearchDetail"
          ></el-button> -->
        </el-input>
        <el-select v-model="quickName" placeholder="快筛项">
          <el-option
            v-for="item in quickSelectedItems"
            :key="item.Id"
            :label="item.Name"
            :value="item.Name"
          >
          </el-option>
        </el-select>
        <el-button @click="onSearchDetail">搜索</el-button>

        <group title="物料列表">
          <scroller
            lock-x
            height="calc(80vh - 140px)"
            @on-pullup-loading="onDetailLoading"
            ref="scrollerDetails"
            :use-pullup="true"
          >
            <div class="box2">
              <checker
                v-model="detailCheckList"
                type="checkbox"
                default-item-class="item"
                selected-item-class="item-selected"
              >
                <checker-item
                  :value="item"
                  v-for="(item, index) in details"
                  :key="index"
                  :disabled="item.ApplyNum < 1"
                >
                  <div>物料编码：{{ item.ItemCode }}</div>
                  <div>物料名称：{{ item.name }}</div>
                  <x-number
                    title="申请数量"
                    v-model="item.ApplyNum"
                    :min="0"
                    @click.native="onQuantityClick(item)"
                  ></x-number>
                </checker-item>
              </checker>
              <!-- <load-more tip="loading"></load-more> -->
            </div>
          </scroller>
        </group>
      </div>
    </popup>
  </div>
</template>
<script>
import selector from "@/components/Selector";

export default {
  data() {
    return {
      quickSelectedItems: [],
      quickName: "",
      detailsPage: 1,
      detailCheckList: [],
      detailList: [],
      detailId: "",
      details: [],
      detailKey: "",
      showDetailPopup: false,
      inventory: "",
      inventorys: [],
      inventoryKey: "",
      showInventoryPopup: false,
      inventoryName: "",
      typeId: "",
      types: [],
      typeKey: "",
      showTypePopup: false,
      typeName: "",
      teamName: "",
      showTeamPopup: false,
      teamKey: "",
      teams: [],
      teamId: "",
      departmentName: "",
      showDepartmentPopup: false,
      departmentId: "",
      departments: [],
      departmentKey: "",
      closeDepartmentSelector: true,
    };
  },

  methods: {
    resetTeam() {
      this.teamName = "";
      this.teamKey = "";
      this.teams = [];
      this.teamId = "";
    },

    resetInventory() {
      this.inventory = "";
      this.inventorys = [];
      this.inventoryKey = "";
      this.inventoryName = "";
    },

    onTypeSelectorClick() {
      if (this.types.length < 1) {
        this.onSearchType();
      }
      this.showTypePopup = true;
    },

    onDepartmentSelectorClick() {
      if (this.departments.length < 1) {
        this.onSearchDepartment();
      }

      this.showDepartmentPopup = true;
    },

    resetData() {
      this.detailsPage = 1;
      this.detailCheckList = [];
      this.detailList = [];
      this.detailId = "";
      this.details = [];
      this.detailKey = "";
      this.showDetailPopup = false;
      this.inventory = "";
      this.inventorys = [];
      this.inventoryKey = "";
      this.showInventoryPopup = false;
      this.inventoryName = "";
      this.typeId = "";
      this.types = [];
      this.typeKey = "";
      this.showTypePopup = false;
      this.typeName = "";
      this.teamName = "";
      this.showTeamPopup = false;
      this.teamKey = "";
      this.teams = [];
      this.teamId = "";
      this.departmentName = "";
      this.showDepartmentPopup = false;
      this.departmentId = "";
      this.departments = [];
      this.departmentKey = "";
      this.closeDepartmentSelector = true;
    },

    onDetailLoading() {
      this.detailsPage++;

      this.searchDetail()
        .then((res) => {
          this.$refs.scrollerDetails.donePullup();

          let data = res.data;
          if (data.Success) {
            let datas = data.Result.Datas;
            // console.log(data);
            if (datas.length == 0) {
              this.showToast("text", "没有数据");
            }

            // for (const iterator of datas) {
            //   this.details.push({
            //     id: iterator.Id,
            //     code: iterator.Code,
            //     name: iterator.Name,
            //     quantity: 0,
            //   });
            // }

            for (let i = 0; i < datas.length; i++) {
              this.details.push({
                LineNum: i + 1,
                ItemId: datas[i].Id,
                ItemCode: datas[i].Code,
                name: datas[i].Name,
                ApplyNum: 0,
              });
            }
          } else {
            this.showToast("warn", data.Message);
          }
        })
        .catch((err) => {
          this.$refs.scrollerDetails.donePullup();

          this.showToast("warn", err.toString());
        });
    },

    onDetailCheckSure() {
      this.showDetailPopup = false;
      this.detailList = this.detailList.concat(this.detailCheckList);
      this.detailCheckList = [];
      this.details = [];
      this.quickName = "";
      this.quickSelectedItems = [];
    },

    onDetailDelete(index) {
      this.detailList.splice(index, 1);
      // console.log(index);
    },

    showLoading() {
      this.$vux.loading.show({
        text: "Loading",
      });
    },

    hideLoading() {
      this.$vux.loading.hide();
    },

    onQuantityClick(detail) {
      event.stopPropagation();
      this.$nextTick(() => {
        // let detail = this.detailCheckList[index];
        if (detail.ApplyNum < 1) {
          let flag = this.detailCheckList.includes(detail);
          if (flag) {
            let index = this.detailCheckList.indexOf(detail);
            this.detailCheckList.splice(index, 1);
          }
        }
      });
    },

    onDetailChange() {},

    searchDetail() {
      let inventory = JSON.parse(this.inventory);
      // console.log(inventory);
      return this.$axiosApi.getItems(
        inventory.code,
        this.detailKey,
        this.quickName,
        this.detailsPage
      );
    },

    onSearchDetail() {
      this.detailsPage = 1;
      this.details = [];

      this.showLoading();

      this.searchDetail()
        .then((res) => {
          this.hideLoading();

          let data = res.data;
          if (data.Success) {
            let datas = data.Result.Datas;
            // console.log(data);
            if (datas.length == 0) {
              this.showToast("text", "没有数据");
            } else {
              this.$refs.scrollerDetails.enablePullup();
            }

            // for (const iterator of datas) {
            //   this.details.push({
            //     id: iterator.Id,
            //     code: iterator.Code,
            //     name: iterator.Name,
            //     quantity: 0,
            //   });
            // }

            for (let i = 0; i < datas.length; i++) {
              this.details.push({
                LineNum: i + 1,
                ItemId: datas[i].Id,
                ItemCode: datas[i].Code,
                name: datas[i].Name,
                ApplyNum: 0,
              });
            }
            this.$refs.scrollerDetails.reset({ top: 0 });
          } else {
            this.showToast("warn", data.Message);
          }
        })
        .catch((err) => {
          this.hideLoading();

          this.showToast("warn", err.toString());
        });
    },

    onAddClick() {
      if (this.inventory != "") {
        this.showDetailPopup = true;
        if (this.details < 1) {
          this.$refs.scrollerDetails.disablePullup();
        }
        this.$axiosApi
          .getQuickSelectedItem()
          .then((res) => {
            let data = res.data;
            console.log(data);
            if (data.Success) {
              this.quickSelectedItems = data.Result.Datas;
            } else {
              this.showToast("warn", data.Message);
            }
          })
          .catch((err) => {
            this.showToast("warn", err.toString());
          });
      } else {
        this.showToast("warn", "来源子库存不能为空");
      }
    },

    onInventoryChange(val, label) {
      this.inventoryName = label;
      this.showInventoryPopup = false;
    },

    onSearchInventory() {
      this.showLoading();

      this.$axiosApi
        .getTargetWarehouse(this.departmentId, this.inventoryKey)
        .then((res) => {
          this.hideLoading();

          let data = res.data;
          if (data.Success) {
            let datas = data.Result.Datas;
            if (datas.length == 0) {
              this.showToast("text", "没有数据");
            } else {
              this.inventorys = [];
            }

            for (const iterator of datas) {
              this.inventorys.push({
                key: JSON.stringify({ id: iterator.Id, code: iterator.Code }),
                value: iterator.Name,
              });
            }
          } else {
            this.showToast("warn", data.Message);
          }
        })
        .catch((err) => {
          this.hideLoading();

          this.showToast("warn", err.toString());
        });
    },

    onInventorySelectorClick() {
      if (this.departmentId != "") {
        if (this.inventorys.length < 1) {
          this.onSearchInventory();
        }
        this.showInventoryPopup = true;
      } else {
        this.showToast("warn", "部门不能为空");
      }
    },

    onTypeChange(val, label) {
      this.typeName = label;
      this.showTypePopup = false;
    },

    onSearchType() {
      this.showLoading();

      this.$axiosApi
        .getTransactionType(this.typeKey)
        .then((res) => {
          this.hideLoading();

          let data = res.data;
          if (data.Success) {
            let datas = data.Result.Datas;
            if (datas.length == 0) {
              this.showToast("text", "没有数据");
            } else {
              this.types = [];
            }

            for (const iterator of datas) {
              this.types.push({
                key: iterator.Id,
                value: iterator.Name,
                Code: iterator.Code,
              });
            }
          } else {
            this.showToast("warn", data.Message);
          }
        })
        .catch((err) => {
          this.hideLoading();

          this.showToast("warn", err.toString());
        });
    },

    onTeamChange(val, label) {
      this.teamName = label;
      this.showTeamPopup = false;
    },

    onSearchTeam() {
      this.showLoading();

      this.$axiosApi
        .getBomTeam(this.departmentId, this.teamKey)
        .then((res) => {
          this.hideLoading();

          let data = res.data;
          if (data.Success) {
            let datas = data.Result.Datas;
            if (datas.length == 0) {
              this.showToast("text", "没有数据");
            } else {
              this.teams = [];
            }

            for (const iterator of datas) {
              this.teams.push({
                key: iterator.Id,
                value: iterator.Name,
                Code: iterator.Code,
              });
            }
          } else {
            this.showToast("warn", data.Message);
          }
        })
        .catch((err) => {
          this.hideLoading();

          this.showToast("warn", err.toString());
        });
    },

    onTeamSelectorClick() {
      if (this.departmentId != "") {
        if (this.teams.length < 1) {
          this.onSearchTeam();
        }
        this.showTeamPopup = true;
      } else {
        this.showToast("warn", "部门不能为空");
      }
    },

    onDepartmentChange(value, label) {
      this.departmentName = label;
      this.showDepartmentPopup = false;
      this.resetTeam();
      this.resetInventory();
    },

    showToast(type, text) {
      this.$vux.toast.show({
        text,
        type,
        time: 1000 * 2,
        width: "80%",
      });
    },

    onCommit() {
      if (
        this.departmentId != "" &&
        this.teamId != "" &&
        this.typeId != "" &&
        this.inventory != "" &&
        this.detailList.length > 0
      ) {
        this.showLoading();
        let materiaRequisitionData = {};
        materiaRequisitionData.BomDepartmentsId = this.departmentId;
        materiaRequisitionData.BomTeamId = this.teamId;
        materiaRequisitionData.TransactionTypeId = this.typeId;
        materiaRequisitionData.WarehouseId = JSON.parse(this.inventory).id;
        materiaRequisitionData.MateriaRequisitionDetailDatas = this.detailList;
        // console.log(materiaRequisitionData);

        this.$axiosApi
          .generateMateriaRquisition(materiaRequisitionData)
          .then((res) => {
            this.hideLoading();
            let data = res.data;
            if (data.Success) {
              this.resetData();
            } else {
              this.showToast("warn", data.Message);
            }
          })
          .catch((err) => {
            this.hideLoading();
            this.showToast("warn", err.toString());
          });
      } else {
        this.showToast("warn", "表单数据不全不能提交");
      }
    },

    onSearchDepartment() {
      this.showLoading();

      this.$axiosApi
        .getBomDepartments(this.departmentKey)
        .then((res) => {
          this.hideLoading();

          let data = res.data;
          if (data.Success) {
            let datas = data.Result.Datas;
            if (datas.length == 0) {
              this.showToast("text", "没有数据");
            } else {
              this.departments = [];
            }

            for (const iterator of datas) {
              this.departments.push({
                key: iterator.Id,
                value: iterator.Name,
                Code: iterator.Code,
              });
            }
          } else {
            this.showToast("warn", data.Message);
          }
        })
        .catch((err) => {
          this.hideLoading();

          this.showToast("warn", err.toString());
        });
    },
  },

  components: {
    selector,
  },
};
</script>
<style lang='less' scoped>
.divide {
  font-size: 16px;
  position: relative;
  height: 40px;
  background-color: #bdc3c7;
  span {
    position: absolute;
    margin: 10px;
  }
}

.weui-btn {
  position: absolute;
  right: 0px;
  margin: 5px;
}

.contain1 {
  margin-top: 55px;
}

.vux-1px-tb {
  overflow-y: scroll;
  height: calc(~"100% - 265px");
}

.item {
  border: 1px solid #ececec;
  padding: 5px 15px;
}
.item-selected {
  border: 1px solid green;
}

.vux-checker-item {
  display: block;
}

.weui-cell:before {
  border-top: none !important;
}

// .input-with-select{
//   position:fixed;
//   top: 20%;
// }

.popup-group {
  overflow-y: scroll;
  height: calc(~"80vh - 50px");
}

// .el-select{
//   width: 100%;
// }
</style>