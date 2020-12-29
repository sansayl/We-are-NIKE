<template>
  <div class="sendPage">
    <div class="staffSelect">
      <template>
        <el-form
          :inline="true"
          :model="formInline"
          ref="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="" prop="user">
            <el-input
              v-model="formInline.user"
              placeholder="员工姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="" prop="role">
            <el-select v-model="formInline.role" placeholder="角色">
              <el-option label="一般店员" value="一般店员"></el-option>
              <el-option label="仓库管理员" value="仓库管理员"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="tel">
            <el-input
              v-model="formInline.tel"
              placeholder="电话号码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="selectForm('formInline')"
              >查询</el-button
            >
            <el-button @click="resetForm('formInline')">重置</el-button>
            <el-button type="primary" class="deleBt">删除</el-button>
          </el-form-item>
          <el-form-item> </el-form-item>
        </el-form>
      </template>
    </div>
    <div class="SG-data">
      <template>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="待出库" name="first">
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column
                prop="trackingNumber"
                label="物流单号"
                width="200"
              >
              </el-table-column>
              <el-table-column prop="productName" label="商品名称" width="120">
              </el-table-column>
              <el-table-column prop="userName" label="买家姓名" width="120">
              </el-table-column>
              <el-table-column prop="userNumber" label="电话号码" width="120">
              </el-table-column>
              <el-table-column prop="getAddress" label="收货地址">
              </el-table-column>
              <el-table-column prop="shipAddress" label="发货地址">
              </el-table-column>
              <el-table-column prop="isship" label="发货状态" width="100">
              </el-table-column>
              <el-table-column prop="orderTime" label="下单时间" width="100">
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="">
                  <el-button
                    type="text"
                    @click="SGdetail = true"
                    class="SDetailBt"
                    >详情</el-button
                  >
                  <el-button
                    type="text"
                    @click="SGedit = true"
                    size="small"
                    class="SEditBt"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    @click="sendStatusVisible = true"
                    size="small"
                    class="SStatusBt"
                    >状态</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="已出库" name="second">
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column
                prop="trackingNumber"
                label="物流单号"
                width="200"
              >
              </el-table-column>
              <el-table-column prop="productName" label="商品名称" width="120">
              </el-table-column>
              <el-table-column prop="userName" label="买家姓名" width="120">
              </el-table-column>
              <el-table-column prop="userNumber" label="电话号码" width="120">
              </el-table-column>
              <el-table-column prop="getAddress" label="收货地址">
              </el-table-column>
              <el-table-column prop="shipAddress" label="发货地址">
              </el-table-column>
              <el-table-column prop="isship" label="发货状态" width="100">
              </el-table-column>
              <el-table-column prop="orderTime" label="下单时间" width="100">
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="">
                  <el-button
                    type="text"
                    @click="SGdetail = true"
                    class="SDetailBt"
                    >详情</el-button
                  >
                  <el-button
                    type="text"
                    @click="SGedit = true"
                    size="small"
                    class="SEditBt"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    @click="sendStatusVisible = true"
                    size="small"
                    class="SStatusBt"
                    >状态</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="待签收" name="third">
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column
                prop="trackingNumber"
                label="物流单号"
                width="200"
              >
              </el-table-column>
              <el-table-column prop="productName" label="商品名称" width="120">
              </el-table-column>
              <el-table-column prop="userName" label="买家姓名" width="120">
              </el-table-column>
              <el-table-column prop="userNumber" label="电话号码" width="120">
              </el-table-column>
              <el-table-column prop="getAddress" label="收货地址">
              </el-table-column>
              <el-table-column prop="shipAddress" label="发货地址">
              </el-table-column>
              <el-table-column prop="isship" label="发货状态" width="100">
              </el-table-column>
              <el-table-column prop="orderTime" label="下单时间" width="100">
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="">
                  <el-button
                    type="text"
                    @click="SGdetail = true"
                    class="SDetailBt"
                    >详情</el-button
                  >
                  <el-button
                    type="text"
                    @click="SGedit = true"
                    size="small"
                    class="SEditBt"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    @click="sendStatusVisible = true"
                    size="small"
                    class="SStatusBt"
                    >状态</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="已签收" name="fourth">
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column
                prop="trackingNumber"
                label="物流单号"
                width="200"
              >
              </el-table-column>
              <el-table-column prop="productName" label="商品名称" width="120">
              </el-table-column>
              <el-table-column prop="userName" label="买家姓名" width="120">
              </el-table-column>
              <el-table-column prop="userNumber" label="电话号码" width="120">
              </el-table-column>
              <el-table-column prop="getAddress" label="收货地址">
              </el-table-column>
              <el-table-column prop="shipAddress" label="发货地址">
              </el-table-column>
              <el-table-column prop="isship" label="发货状态" width="100">
              </el-table-column>
              <el-table-column prop="orderTime" label="下单时间" width="100">
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="150">
                <template slot-scope="">
                  <el-button
                    type="text"
                    @click="SGdetail = true"
                    class="SDetailBt"
                    >详情</el-button
                  >
                  <el-button
                    type="text"
                    @click="SGedit = true"
                    size="small"
                    class="SEditBt"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    @click="sendStatusVisible = true"
                    size="small"
                    class="SStatusBt"
                    >状态</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
    <!-- 发货详情 -->
    <div>
      <el-dialog title="订单详情" :visible.sync="SGdetail" width="90%">
        <el-table :data="tableData" border class="sendDaitalTab">
          <el-table-column
            property="orderNumber"
            label="订单编号"
            width="100"
          ></el-table-column>
          <el-table-column
            property="productName"
            label="商品名称"
            width="100"
          ></el-table-column>
          <el-table-column
            property="productNumber"
            label="商品数量"
            width="100"
          ></el-table-column>
          <el-table-column
            property="productType"
            label="商品类型"
            width="100"
          ></el-table-column>
          <el-table-column
            property="productPrice"
            label="商品价格"
            width="100"
          ></el-table-column>
          <el-table-column
            property="freight"
            label="运费"
            width="100"
          ></el-table-column>
          <el-table-column
            property="orderTime"
            label="下单时间"
            width="100"
          ></el-table-column>
          <el-table-column
            property="userName"
            label="买家名称"
            width="100"
          ></el-table-column>
          <el-table-column
            property="userNumber"
            label="电话号码"
            width="100"
          ></el-table-column>
          <el-table-column
            property="shipAddress"
            label="发货地址"
            width="150"
          ></el-table-column>
          <el-table-column
            property="shouhuoAddress"
            label="收获地址"
            width="150"
          ></el-table-column>
          <el-table-column
            property="trackingNumber"
            label="物流单号"
            width="150"
          ></el-table-column>
          <el-table-column
            property="isship"
            label="发货状态"
            width="100"
          ></el-table-column>
          <el-table-column
            property="fahuoTime"
            label="发货时间"
            width="120"
          ></el-table-column>
        </el-table>
      </el-dialog>
    </div>
    <!-- 发货编辑 -->
    <div>
      <el-dialog title="订单编辑" :visible.sync="SGedit" width="50%">
        <el-table :data="tableData" border>
          <el-table-column
            property="orderNumber"
            label="订单编号"
            width="150"
          ></el-table-column>
          <el-table-column
            property="productName"
            label="商品名称"
            width="150"
          ></el-table-column>
          <el-table-column
            property="userName"
            label="买家名称"
            width="200"
          ></el-table-column>
          <el-table-column
            property="userNumber"
            label="电话号码"
          ></el-table-column>
        </el-table>
        <div style="margin: 20px"></div>
        <el-form label-width="80px" :model="formLabelAlign" class="senEdInp">
          <el-form-item label="物流单号 :" width="100">
            <el-input v-model="formLabelAlign.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="发货地址 :">
            <el-input v-model="formLabelAlign.region" clearable></el-input>
          </el-form-item>
          <el-form-item label="发货状态">
            <el-select
              v-model="formLabelAlign.type"
              placeholder="请选择发货状态"
            >
              <el-option label="待出库" value="shanghai"></el-option>
              <el-option label="已出库" value="beijing"></el-option>
              <el-option label="待签收" value="beijing"></el-option>
              <el-option label="未签收" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibles = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisibles = false"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <div>
      <el-dialog title="发货状态" :visible.sync="sendStatusVisible">
        <el-form :model="statusData">
         
          <el-form-item label="发货状态" :label-width="formLabelWidth">
            <el-select v-model="statusData.sendStatus" placeholder="请选择发货状态">
              <el-option label="未发货" value="shanghai"></el-option>
              <el-option label="已发货" value="beijing"></el-option>
              <el-option label="未出库" value="beijing"></el-option>
              <el-option label="已出库" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="sendStatusVisible = false">取 消</el-button>
          <el-button type="primary" @click="sendStatusVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="SG-fenye">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="1000"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 查询
    selectForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //新增提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // tab选项
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },

  data() {
    return {
      formInline: {
        user: "",
        role: "",
        tel: "",
      },
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
      block: "block",
      none: "none",
      value: "",

      tableData: [
        {
          orderNumber: "11111",
          productName: "nike air",
          productNumber: "99",
          productType: "男鞋",
          productPrice: "129",
          userName: "渣渣辉",
          userNumber: "15228533647",
          trackingNumber: "45645156156443165456456",
          freight: 6,
          getAddress: "四川省成都高新区天府三街",
          shipAddress: "上海市普陀区金沙江路 1518 弄",
          shouhuoAddress: "成都市武侯区高新青年公寓",
          orderTime: "2020-12-12",
          fahuoTime: "2020-12-22",
          isship: "未发货",
        },
      ],
      //发货状态页数据
      statusData:[
        {
          sendStatus:"未出库"

      }],
      // 发货状态页
      formLabelWidth: '120px',
      SGdetail: false,
      dialogFormVisible: false,
      SGedit: false,
      // tab选项卡
      activeName: "first",
      //  编辑页弹窗
      dialogVisibles: false, 
      // 发货状态弹窗
      sendStatusVisible:false,
    };
  },
};
</script>

<style lang="less" scoped>
.sendPage {
  padding: 20px;
}
.SG-fenye {
  margin-top: 30px;
}
.SG-data {
  margin-top: 30px;
}
.SDetailBt {
  font-size: 14px;
}
.staffSelect {
  width: 100%;
  height: 60px;
  //background: teal;
  padding-top: 20px;
  border-top: gray;
}
//搜索
.el-form-item {
  margin-bottom: 0 !important;
}

//新增按钮样式
.el-button {
  border: none;
}
.staffAddBt {
  background: #67c23a;
}
// 删除按钮
.deleBt {
  background: #f56c6c !important;
  color: white;
}
// 表格内按钮
// 详情
.SDetailBt {
  color: #67c23a;
}
// 状态
.SStatusBt {
  color: #e6a23c;
}
// 按钮字体
.el-button {
  font-size: 14px;
}
// 详情页表格字体
.sendDaitalTab .el-table-column {
  font-size: 14px !important;
}
// 编辑页内样式
.senEdInp .el-form-item {
  margin-bottom: 20px !important;
}
</style>