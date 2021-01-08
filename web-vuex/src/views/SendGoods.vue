<template>
  <div class="sendPage">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/about/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>发货管理</el-breadcrumb-item>
      <el-breadcrumb-item>发货管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="staffSelect">
      <template>
        <el-form
          :inline="true"
          :model="orderInfo"
          ref="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="">
            <el-input
              v-model="orderInfo.goodsName"
              placeholder="商品名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="orderInfo.status" placeholder="请选择发货状态">
              <el-option label="待出库" value="1"></el-option>
              <el-option label="已出库" value="2"></el-option>
              <el-option label="待签收" value="3"></el-option>
              <el-option label="已签收" value="4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="orderInfo.buyerName"
              placeholder="买家名称"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="selectDate()">查询</el-button>
            <el-button @click="resetForm('formInline')">重置</el-button>
            <!-- <el-button type="primary" class="deleBt">删除</el-button> -->
          </el-form-item>
          <el-form-item> </el-form-item>
        </el-form>
      </template>
    </div>
    <div class="SG-data">
      <template>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="待出库" name="1">
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column prop="orderId" label="物流单号" width="200">
              </el-table-column>
              <el-table-column prop="goodsName" label="商品名称" width="120">
              </el-table-column>
              <el-table-column prop="buyerName" label="买家姓名" width="120">
              </el-table-column>
              <el-table-column prop="phone" label="电话号码" width="120">
              </el-table-column>
              <el-table-column prop="receiveAddress" label="收货地址">
              </el-table-column>
              <el-table-column prop="deliveryAddress" label="发货地址">
              </el-table-column>
              <el-table-column prop="status" label="发货状态" width="100">
                <template slot-scope="scope">
                  {{ scope.row.status | status }}
                </template>
              </el-table-column>
              <el-table-column prop="order_time" label="下单时间" width="100">
                <template slot-scope="scope">
                  {{ scope.row.order_time | format("yyyy-MM-dd hh:mm:ss") }}
                </template>
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="
                      SGdetail = true;
                      orderDetail(scope.row);
                    "
                    class="SDetailBt"
                    >详情</el-button
                  >
                  <el-button
                    type="text"
                    @click="
                      dialogVisibles = true;
                      orderEdit(scope.row);
                    "
                    size="small"
                    class="SEditBt"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    @click="
                      sendStatusVisible = true;
                      orderStatus(scope.row);
                    "
                    size="small"
                    class="SStatusBt"
                    >状态</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    @click="sendGoodDele(scope.row.id)"
                    class="tabDelBt"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="已出库" name="2">
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column prop="orderId" label="物流单号" width="200">
              </el-table-column>
              <el-table-column prop="goodsName" label="商品名称" width="120">
              </el-table-column>
              <el-table-column prop="buyerName" label="买家姓名" width="120">
              </el-table-column>
              <el-table-column prop="phone" label="电话号码" width="120">
              </el-table-column>
              <el-table-column prop="receiveAddress" label="收货地址">
              </el-table-column>
              <el-table-column prop="deliveryAddress" label="发货地址">
              </el-table-column>
              <el-table-column prop="status" label="发货状态" width="100">
                <template slot-scope="scope">
                  {{ scope.row.status | status }}
                </template>
              </el-table-column>
              <el-table-column prop="order_time" label="下单时间" width="100">
                <template slot-scope="scope">
                  {{ scope.row.order_time | format("yyyy-MM-dd hh:mm:ss") }}
                </template>
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="
                      SGdetail = true;
                      orderDetail(scope.row);
                    "
                    class="SDetailBt"
                    >详情</el-button
                  >
                  <el-button
                    type="text"
                    @click="
                      dialogVisibles = true;
                      orderEdit(scope.row);
                    "
                    size="small"
                    class="SEditBt"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    @click="
                      sendStatusVisible = true;
                      orderStatus(scope.row);
                    "
                    size="small"
                    class="SStatusBt"
                    >状态</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    @click="sendGoodDele(scope.row.id)"
                    class="tabDelBt"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="待签收" name="3">
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column
                prop="Logistics_number"
                label="物流单号"
                width="200"
              >
              </el-table-column>
              <el-table-column prop="goodsName" label="商品名称" width="120">
              </el-table-column>
              <el-table-column prop="buyerName" label="买家姓名" width="120">
              </el-table-column>
              <el-table-column prop="phone" label="电话号码" width="120">
              </el-table-column>
              <el-table-column prop="receiveAddress" label="收货地址">
              </el-table-column>
              <el-table-column prop="deliveryAddress" label="发货地址">
              </el-table-column>
              <el-table-column prop="status" label="发货状态" width="100">
                <template slot-scope="scope">
                  {{ scope.row.status | status }}
                </template>
              </el-table-column>
              <el-table-column prop="order_time" label="下单时间" width="100">
                <template slot-scope="scope">
                  {{ scope.row.order_time | format("yyyy-MM-dd hh:mm:ss") }}
                </template>
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="
                      SGdetail = true;
                      orderDetail(scope.row);
                    "
                    class="SDetailBt"
                    >详情</el-button
                  >
                  <el-button
                    type="text"
                    @click="
                      dialogVisibles = true;
                      orderEdit(scope.row);
                    "
                    size="small"
                    class="SEditBt"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    @click="
                      sendStatusVisible = true;
                      orderStatus(scope.row);
                    "
                    size="small"
                    class="SStatusBt"
                    >状态</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    @click="sendGoodDele(scope.row.id)"
                    class="tabDelBt"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="已签收" name="4">
            <el-table
              :data="tableData"
              border
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="40"></el-table-column>
              <el-table-column prop="orderId" label="物流单号" width="200">
              </el-table-column>
              <el-table-column prop="goodsName" label="商品名称" width="120">
              </el-table-column>
              <el-table-column prop="buyerName" label="买家姓名" width="120">
              </el-table-column>
              <el-table-column prop="phone" label="电话号码" width="120">
              </el-table-column>
              <el-table-column prop="receiveAddress" label="收货地址">
              </el-table-column>
              <el-table-column prop="deliveryAddress" label="发货地址">
              </el-table-column>
              <el-table-column prop="status" label="发货状态" width="100">
                <template slot-scope="scope">
                  {{ scope.row.status | status }}
                </template>
              </el-table-column>
              <el-table-column prop="order_time" label="下单时间" width="100">
                <template slot-scope="scope">
                  {{ scope.row.order_time | format("yyyy-MM-dd hh:mm:ss") }}
                </template>
              </el-table-column>

              <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="
                      SGdetail = true;
                      orderDetail(scope.row);
                    "
                    class="SDetailBt"
                    >详情</el-button
                  >
                  <el-button
                    type="text"
                    @click="
                      dialogVisibles = true;
                      orderEdit(scope.row);
                    "
                    size="small"
                    class="SEditBt"
                    >编辑</el-button
                  >
                  <el-button
                    type="text"
                    @click="
                      sendStatusVisible = true;
                      orderStatus(scope.row);
                    "
                    size="small"
                    class="SStatusBt"
                    >状态</el-button
                  >
                  <el-button
                    type="text"
                    size="small"
                    @click="sendGoodDele(scope.row.id)"
                    class="tabDelBt"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
    <!-- 订单详情 -->
    <div>
      <el-dialog title="订单详情" :visible.sync="SGdetail" width="90%">
        <el-table :data="newOrderData" border class="sendDaitalTab">
          <el-table-column
            property="orderId"
            label="订单编号"
            width="100"
          ></el-table-column>
          <el-table-column
            property="goodsName"
            label="商品名称"
            width="100"
          ></el-table-column>
          <el-table-column
            property="goodsNumber"
            label="商品数量"
            width="100"
          ></el-table-column>
          <el-table-column
            property="goodsTypeName"
            label="商品类型"
            width="100"
          ></el-table-column>
          <el-table-column
            property="price"
            label="商品价格"
            width="100"
          ></el-table-column>
          <el-table-column
            property="freight"
            label="运费"
            width="100"
          ></el-table-column>
          <el-table-column property="order_time" label="下单时间" width="100">
            <template slot-scope="scope">
              {{ scope.row.order_time | format("yyyy-MM-dd hh:mm:ss") }}
            </template>
          </el-table-column>
          <el-table-column
            property="buyerName"
            label="买家名称"
            width="100"
          ></el-table-column>
          <el-table-column
            property="phone"
            label="电话号码"
            width="100"
          ></el-table-column>
          <el-table-column
            property="deliveryAddress"
            label="发货地址"
            width="150"
          ></el-table-column>
          <el-table-column
            property="receiveAddress"
            label="收获地址"
            width="150"
          ></el-table-column>
          <el-table-column
            property="Logistics_number"
            label="物流单号"
            width="150"
          ></el-table-column>
          <el-table-column property="status" label="发货状态" width="100">
            <template slot-scope="scope">
              {{ scope.row.status | status }}
            </template>
          </el-table-column>
          <el-table-column property="deliveryTime" label="发货时间" width="120">
            <template slot-scope="scope">
              {{ scope.row.deliveryTime | format("yyyy-MM-dd hh:mm:ss") }}
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
    <!-- 订单编辑 -->
    <div>
      <el-dialog title="订单编辑" :visible.sync="dialogVisibles" @close="editOrder" width="50%">
        <el-table :data="newOrderData" border>
          <el-table-column
            property="orderId"
            label="订单编号"
            width="150"
          ></el-table-column>
          <el-table-column
            property="goodsName"
            label="商品名称"
            width="150"
          ></el-table-column>
          <el-table-column
            property="buyerName"
            label="买家名称"
            width="200"
          ></el-table-column>
          <el-table-column property="orderId" label="订单编号"></el-table-column>
        </el-table>
        <div style="margin: 20px"></div>
        <el-form ref="editOrder" label-width="100px" :model="formLabelAlign" :rules="editFormRules" class="senEdInp">
          <el-form-item label="手机号:" width="100" prop="phone">
            <el-input v-model="formLabelAlign.phone" clearable ></el-input>
          </el-form-item>
          <el-form-item label="发货地址:" prop="receiveAddress">
            <el-input v-model="formLabelAlign.receiveAddress" clearable></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibles = false">取 消</el-button>
          <el-button
            type="primary"
            @click="sureEdit()"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
    <!-- 状态编辑 -->
    <div>
      <el-dialog title="发货状态" :visible.sync="sendStatusVisible">
        <el-form :model="statusData">
          <el-form-item label="发货状态" :label-width="formLabelWidth">
            <el-select
              v-model="statusData.sendStatus"
              placeholder="请选择发货状态"
            >
              <el-option label="待出库" value="1"></el-option>
              <el-option label="已出库" value="2"></el-option>
              <el-option label="待签收" value="3"></el-option>
              <el-option label="已签收" value="4"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="sendStatusVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              sendStatusVisible = false;
              get_id();
            "
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
    <div class="SG-fenye">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="orderInfo.page"
        :page-sizes="[1, 10, 15, 20, 100]"
        :page-size="orderInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableTotal"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.activeName = this.orderInfo.status;
  },
  mounted() {
    this.getAllData(); //进入页面就加载
  },

  methods: {
    editOrder(){
      this.$refs.editOrder.resetFields()
    },
    // 分页
    handleSizeChange(newSize) {
      this.orderInfo.pageSize = newSize;
      this.getAllData();
    },
    // 监听 页码值 的改变
    handleCurrentChange(newPage) {
      this.orderInfo.page = newPage;
      this.getAllData();
    },
    // 获取后台订单数据
    getAllData() {
      this.$axios({
        url: "/delivery/list",
        method: "post",
        data: this.orderInfo,
      })
        .then((res) => {
       
          this.tableData = res.data.date.list;
          this.tableTotal = res.data.date.total;       
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // tab选项卡切换事件
    handleClick(tab) {
      console.log(tab);
      this.orderInfo.status = tab.name;
      this.getAllData();
    },
  
    // 点击详情,获取当前行的数据
    orderDetail(row) {
      this.newOrderData = [];
      return this.newOrderData.push(row);
    },
    // 点击编辑,获取当前行的数据
    orderEdit(row) {
      this.dialogVisibles= true
      console.log(this.formLabelAlign);
      this.newOrderData = [];
      console.log(row.id);
      return (
        this.newOrderData.push(row),
        this.formLabelAlign.id = row.id
      );
    },
    // 点击确认编辑, 获取当前修改的数据
    sureEdit() {
      this.$refs.editOrder.validate(valid=>{
        console.log(valid);
                if(!valid) return
                console.log(this.formLabelAlign);
                this.$axios({
                  url: "/delivery/update",
                  method: "post",
                  data: this.formLabelAlign,
                })
                  .then((res) => {
                    console.log(res);
                    // this.formLabelAlign.receiveAddress=''
                    // this.formLabelAlign.phone=''
                    // alert(res.data.msg);
                  this.$message.success("更新用户状态成功");
                  this.dialogVisibles= false
                  this.getAllData()
                  })
                  .catch((err) => {
                    console.log(err);
                  });
            })     
    },
    // 点击状态按钮, 获取当前行
    orderStatus(row) {
      console.log(row);
      return this.statusId = row.id;
    },
    // 点击编辑状态 调用接口
    get_id() {
      this.$axios({
        method:'post',
        url:`delivery/status?id=${this.statusId}&status=${this.statusData.sendStatus}`
      }).then(res=>{
        // console.log(res);
        this.$message.success("更新用户状态成功");
        this.getAllData()
      }).catch(err=>{
        this.$message.error("更新用户状态失败");
      })
    },
    // 查询
    selectDate() {
      this.activeName= this.orderInfo.status
       this.$axios({
        url: "/delivery/list",
        method: "post",
        data: this.orderInfo
      })
        .then((res) => {
          console.log(res);
          if(res.data.date.total==0){
            this.$message.error('没有找到数据')
            this.tableData = res.data.date.list;
            this.tableTotal = res.data.date.total;
          }else{
            this.$message.success('查询成功')
            this.tableData = res.data.date.list;
            this.tableTotal = res.data.date.total;
          }
          
        })
        .catch((err) => {
          console.log(err);
        });
     
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.orderInfo.status='1'
      // this.activeName= '1'
      this.orderInfo.buyerName = "";
      this.orderInfo.goodsName = "";
      this.getAllData()
    },
    // table切换
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
    // 删除订单
    sendGoodDele(id) {
      // console.log(id);
      this.$confirm("此操作将永久删除该条订单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then((res) => {
          // 如果用户确认删除 则返回值字符串 confirm
          console.log(res); // confirm
          this.$axios({
            url: "delivery/delete?id=" + id,
          }).then(({ data: res }) => {
            console.log(res);
            this.$message.success("删除用户成功!");
            // 重新获取用户列表数据
            this.getAllData();
          });
        })
        .catch((err) => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },

  data() {
     // 验证手机号的规则
        var checkMobile = (rule, value, cb) => {
             // 验证手机号的正则表达式
            const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
            if(regMobile.test(value)) {
                // 合法的邮箱
                return cb()
            }
            cb(new Error('请输入合法的手机号'))
        }
    return {
      // tab默认选择
      activeName: "",
      // 获取订单列表的参数对象
      orderInfo: {
        // 当前的页数
        page: 1,
        // 当前每页显示多少条数据(页码值)
        pageSize: 10,
        // 订单的状态
        status: "1",
        buyerName: "",
        goodsName: ""
      },
      // 所有数据的数量
      tableTotal: 0,
      // 点击编辑得到当前行的数据
      newOrderData: [],
      formLabelAlign: {
        id: 0,
        buyerName: "",
        logisticsNumber: 0,
        phone: "",
        receiveAddress: "",
      },
      block: "block",
      none: "none",
      value: "",
      // 表格数据
      tableData: [],
      //选择发货状态页数据
      statusData: {
        sendStatus: "1",
      },
      // 发货状态页
      formLabelWidth: "120px",
      SGdetail: false,
      // dialogFormVisible: false,
      SGedit: false,
      //  编辑页弹窗
      dialogVisibles: false,
      // 发货状态弹窗
      sendStatusVisible: false,
      // 点击状态,存储id值
      statusId:0,
      // 编辑数据表单的 验证规则对象
      editFormRules: {
          phone: [
              { required: true, message: '请输入手机号', trigger: 'blur' },
              { min: 11, max: 11, message: '手机号长度有误',  trigger: 'blur'},
              { validator: checkMobile, trigger: 'blur'}
          ],
          receiveAddress: [
            { required: true, message: '地址不能为空', trigger: 'blur' }
          ]
      },
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
// .deleBt {
//   background: #f56c6c !important;
//   color: white;
// }
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
// 删除按钮
.tabDelBt {
  color: #f56c6c !important ;
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