<template>
  <div class="page1">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/about/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="orderSelect">
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
              placeholder="买家信息"
            ></el-input>
          </el-form-item>
          <!--<el-form-item label="" prop="role">-->
          <!--<el-select v-model="formInline.role" placeholder="角色">-->
          <!--<el-option label="一般店员" value="一般店员"></el-option>-->
          <!--<el-option label="仓库管理员" value="仓库管理员"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="" prop="tel">-->
          <!--<el-input-->
          <!--v-model="formInline.tel"-->
          <!--placeholder="电话号码"-->
          <!--&gt;</el-input>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-button
              type="primary"
              @click="
                submitForm('formInline');
                chaxun();
              "
              >查询</el-button
            >
            <el-button @click="resetForm('formInline')">重置</el-button>
            <!-- 删除事件自己写 -->
            <!--<el-button @click="deleteForm('formInline')" class="deleBt"-->
            <!--&gt;删除</el-button-->
            <!--&gt;-->
          </el-form-item>
          <el-form-item> </el-form-item>
        </el-form>
      </template>
    </div>
    <!--table表格-->
    <div class="liebiao">
      <template>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="未支付" name="1" index="0">
            <template>
              <el-table
                :data="tableData"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <!--<el-table-column type="selection" width="40"> </el-table-column>-->

                <el-table-column prop="id" label="商品编号" width="150">
                </el-table-column>

                <el-table-column prop="name" label="商品名称" width="150">
                </el-table-column>

                <el-table-column prop="num" label="商品数量" width="120">
                </el-table-column>

                <el-table-column prop="price" label="商品价格" width="120">
                </el-table-column>

                <el-table-column prop="buyer_name" label="买家名称" width="170">
                </el-table-column>

                <el-table-column
                  prop="order_status"
                  label="订单状态"
                  width="150"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.order_status == 0">未支付</span>
                    <span v-if="scope.row.order_status == 1">已支付</span>
                    <span v-if="scope.row.order_status == 2">待发货</span>
                  </template>
                </el-table-column>

                <el-table-column prop="order_time" label="下单时间" width="210">
                </el-table-column>

                <el-table-column
                  fixed="right"
                  label="操作"
                  width="160"
                  header-align="center"
                >
                  <template class="caozuo" slot-scope="scope">
                    <el-button
                      class="orderDetailBt"
                      @click="
                        dialogTableVisible = true;
                        xiangqing(scope.row);
                      "
                      type="text"
                      size="small"
                      >详情</el-button
                    >
                    <el-button
                      type="text"
                      size="small"
                      @click="
                        centerDialogVisible = true;
                        bianji(scope.row);
                      "
                      >编辑</el-button
                    >
                    <el-button
                     class="statusbt"
                      type="text"
                      size="small"
                      @click="
                        zhuangtai = true;
                        zhuangtai1(scope.row);
                      "
                      >状态</el-button
                    >
                    <!--<template>-->
                    <!--<el-popconfirm title="确定删除吗？" class="tabDelBt" @click="w_queding">-->
                    <!--<el-button type="text" size="small" slot="reference" @click="w_shanchu(scope.row)">删除</el-button>-->
                    <!--</el-popconfirm>-->
                    <!--</template>-->
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="已支付" name="2" index="1">
            <template>
              <el-table
                :data="tableData"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <!--<el-table-column type="selection" width="40"> </el-table-column>-->

                <el-table-column prop="id" label="商品编号" width="150">
                </el-table-column>

                <el-table-column prop="name" label="商品名称" width="150">
                </el-table-column>

                <el-table-column prop="num" label="商品数量" width="120">
                </el-table-column>

                <el-table-column prop="price" label="商品价格" width="120">
                </el-table-column>

                <el-table-column prop="buyer_name" label="买家名称" width="170">
                </el-table-column>

                <el-table-column
                  prop="order_status"
                  label="订单状态"
                  width="150"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.order_status == 0">未支付</span>
                    <span v-if="scope.row.order_status == 1">已支付</span>
                    <span v-if="scope.row.order_status == 2">待发货</span>
                  </template>

                  <!--{{ scope.row.state | state }}-->
                </el-table-column>

                <el-table-column prop="order_time" label="下单时间" width="210">
                </el-table-column>

                <el-table-column
                  fixed="right"
                  label="操作"
                  width="160"
                  header-align="center"
                >
                  <template class="caozuo" slot-scope="scope">
                    <el-button
                      class="orderDetailBt"
                      @click="
                        dialogTableVisible = true;
                        xiangqing(scope.row);
                      "
                      type="text"
                      size="small"
                      >详情</el-button
                    >
                    <el-button
                      type="text"
                      size="small"
                      @click="
                        centerDialogVisible = true;
                        bianji(scope.row);
                      "
                      >编辑</el-button
                    >
                    <el-button
                     class="statusbt"
                     type="text"
                      size="small"
                      @click="
                        zhuangtai = true;
                        zhuangtai1(scope.row);
                      "
                      >状态</el-button
                    >
                    <!--<template>-->
                    <!--<el-popconfirm title="确定删除吗？" class="tabDelBt" @click="w_queding">-->
                    <!--<el-button type="text" size="small" slot="reference" @click="w_shanchu(scope.row)">删除</el-button>-->
                    <!--</el-popconfirm>-->
                    <!--</template>-->
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
          <el-tab-pane label="待发货" name="3" index="2">
            <template>
              <el-table
                :data="tableData"
                border
                style="width: 100%"
                @selection-change="handleSelectionChange"
              >
                <!--<el-table-column type="selection" width="40"> </el-table-column>-->

                <el-table-column prop="id" label="商品编号" width="150">
                </el-table-column>

                <el-table-column prop="name" label="商品名称" width="150">
                </el-table-column>

                <el-table-column prop="num" label="商品数量" width="120">
                </el-table-column>

                <el-table-column prop="price" label="商品价格" width="120">
                </el-table-column>

                <el-table-column prop="buyer_name" label="买家名称" width="170">
                </el-table-column>

                <el-table-column
                  prop="order_status"
                  label="订单状态"
                  width="150"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.order_status == 0">未支付</span>
                    <span v-if="scope.row.order_status == 1">已支付</span>
                    <span v-if="scope.row.order_status == 2">待发货</span>
                  </template>

                  <!--{{ scope.row.state | state }}-->
                </el-table-column>

                <el-table-column prop="order_time" label="下单时间" width="210">
                </el-table-column>

                <el-table-column
                  fixed="right"
                  label="操作"
                  width="160"
                  header-align="center"
                >
                  <template class="caozuo" slot-scope="scope">
                    <el-button
                      class="orderDetailBt"
                      @click="
                        dialogTableVisible = true;
                        xiangqing(scope.row);
                      "
                      type="text"
                      size="small"
                      >详情</el-button
                    >
                    <el-button
                      type="text"
                      size="small"
                      @click="
                        centerDialogVisible = true;
                        bianji(scope.row);
                      "
                      >编辑</el-button
                    >
                    <el-button
                    class="statusbt"
                     type="text"
                      size="small"
                      @click="
                        zhuangtai = true;
                        zhuangtai1(scope.row);
                      "
                      >状态</el-button
                    >
                    <!--<template>-->
                    <!--<el-popconfirm title="确定删除吗？" class="tabDelBt" @click="w_queding">-->
                    <!--<el-button type="text" size="small" slot="reference" @click="w_shanchu(scope.row)">删除</el-button>-->
                    <!--</el-popconfirm>-->
                    <!--</template>-->
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>

    <!--分页-->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="[5, 10, 15]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="5"
      >
      </el-pagination>
    </div>

    <!--详情-->
    <div>
      <el-dialog
        title="订单详情"
        :visible.sync="dialogTableVisible"
        width="94%  "
      >
        <el-table :data="yemian_data">
          <el-table-column
            property="id"
            label="订单编号"
            width="100"
          ></el-table-column>
          <el-table-column
            property="name"
            label="商品名称"
            width="100"
          ></el-table-column>
          <el-table-column
            property="num"
            label="商品数量"
            width="100"
          ></el-table-column>
          <el-table-column
            property="price"
            label="商品价格"
            width="100"
          ></el-table-column>
          <el-table-column
            property="type_id"
            label="商品类型"
            width="150"
          ></el-table-column>
          <el-table-column
            property="freight"
            label="运费"
            width="50"
          ></el-table-column>
          <el-table-column
            property="buyer_name"
            label="买家名称"
            width="150"
          ></el-table-column>
          <el-table-column
            property="phone"
            label="电话号码"
            width="100"
          ></el-table-column>
          <!--<el-table-column-->
          <!--property=""-->
          <!--label="发货地址"-->
          <!--width="150"-->
          <!--&gt;</el-table-column>-->
          <el-table-column
            property="address"
            label="收获地址"
            width="150"
          ></el-table-column>
          <el-table-column
            property="create_time"
            label="下单时间"
            width="150"
          ></el-table-column>
          <el-table-column property="order_status" label="订单状态">
            <template slot-scope="scope">
              <span v-if="scope.row.order_status == 0">未支付</span>
              <span v-if="scope.row.order_status == 1">已支付</span>
              <span v-if="scope.row.order_status == 2">待发货</span>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>

    <!--编辑-->
    <div>
      <el-dialog
        title="编辑订单"
        :visible.sync="centerDialogVisible"
        width="50%"
        center
      >
        <span>
          <!--只读-->
          <div>
            <template>
              <el-table :data="bianji_data" style="width: 100%">
                <el-table-column prop="type_id" label="商品类型" width="220">
                </el-table-column>
                <el-table-column prop="name" label="商品名称" width="240">
                </el-table-column>
                <el-table-column prop="num" label="商品数量" width="120">
                </el-table-column>
                <el-table-column prop="price" label="商品价格" width="120">
                </el-table-column>
              </el-table>
            </template>
          </div>
        </span>
        <!--可编辑-->
        <div>
          <div style="margin: 20px"></div>
          <el-form
            :label-position="labelPosition"
            label-width="80px"
            :model="formLabelAlign"
          >
            <el-form-item label="买家名称">
              <el-input v-model="formLabelAlign.name"></el-input>
            </el-form-item>
            <el-form-item label="电话号码">
              <el-input v-model="formLabelAlign.region"></el-input>
            </el-form-item>
            <el-form-item label="收货地址">
              <el-input v-model="formLabelAlign.type"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="b_queding">确 定</el-button>
          <!--这个确认按钮要重写-->
        </span>
      </el-dialog>
    </div>

    <!--状态-->
    <div>
      <el-dialog
        title="状态修改"
        :visible.sync="zhuangtai"
        width="40%"
        :before-close="handleClose"
      >
        <span class="clearfix">
          <div class="xuanze-1">
            <el-select v-model="value" placeholder="状态">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="xuanze-2">
            <el-select v-model="value1" placeholder="仓库">
              <el-option
                v-for="item in houseData"
                :key="item.value1"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="zhuangtai = false">取 消</el-button>
          <el-button
            type="primary"
            @click="
              zhuangtai = false;
              z_queding();
            "
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<style lang="less" scoped>
.page1 {
  padding: 20px;
}
.el-tabs__header {
  margin: 0 !important;
}
.orderSelect {
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

.el-link {
  margin-left: 10px;
}
.el-link:first-child {
  margin-left: 10px;
}
.el-link {
  font-size: 16px;
}
.liebiao {
  margin-top: 1%;
}
/*状态*/
.el-message-box__message > p {
  color: #c8c8c8;
}
.xuanze-1 {
  float: left;
  width: 220px;
  margin-left: 60px;
  margin-right: 20px;
}
.xuanze-2 {
  margin-left: 30px;
}
.clearfix {
  clear: both;
}

/*分页*/
.block {
  margin-top: 30px;
}
// 操作按钮
//按钮样式
.el-button {
  border: none;
}
// 删除按钮
.deleBt {
  background: #f56c6c !important;
  color: white;
}
// 详情按钮
.orderDetailBt {
  color: #67c23a;
}
// 删除按钮
.tabDelBt {
  margin-left: 5px;
}
.tabDelBt .el-button {
  color: #f56c6c !important ;
}
// tab选项框
.el-tabs__nav {
  background: white !important;
}
// 按钮字体
.el-button {
  font-size: 14px;
}
.statusbt{
  color: #E6A23C;
}
</style>

<script>
export default {
  name: "order",
  data() {
    return {
      //页面进来就渲染
      jiazai: {
        pageSize: "",
        startIndex: "",
        state: "0",
      },

      //新建一个编辑字段的数据数组
      bianji_data: [],

      //点击详情的数组
      yemian_data: [],
      xiangqing_data: [],
      //  详情页
      tableData: [
        // {
        //   Serial: "1",
        //   name: "商品名称",
        //   number: "商品数量",
        //   price: "商品价格",
        //   b_name: "买家名称",
        //   o_status: "订单状态",
        //   data: "下单时间",
        //   o_number: "123",
        //   c_type: "商品类型",
        //   freight: "运费",
        //   phone: "电话号码",
        //   s_Address: "发货地址",
        //   r_Address: "收货地址",
        // },
        // {
        //   Serial: "2",
        //   name: "商品名称1",
        //   number: "商品数量1",
        //   price: "商品价格1",
        //   b_name: "买家名称1",
        //   o_status: "订单状态1",
        //   data: "下单时间1",
        //   o_number: "订单编号1",
        //   c_type: "商品类型1",
        //   freight: "运费1",
        //   phone: "电话号码1",
        //   s_Address: "发货地址1",
        //   r_Address: "收货地址1",
        // },
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      xin: false,

      //    编辑

      centerDialogVisible: false,
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
      //    状态
      zhuangtai: false,
      options: [
        {
          value: "0",
          label: "未支付",
        },
        {
          value: "1",
          label: "已支付",
        },
        {
          value: "2",
          label: "代发货",
        },
      ],
      value: "",
      //仓库
      options1: [
        {
          value1: "选项1",
          label: "仓库",
        },
      ],
      value1: "",

      //    查询框
      input: "",
      formInline: {
        user: "",
        role: "",
        tel: "",
      },

      // //    分页
      currentPage1: 1,
      // currentPage2: 5,
      // currentPage3: 5,
      // currentPage4: 4,

      // tab选项卡
      activeName: "1",
      page: 1,
      pageSize: 15,

      //存放仓库数据
      houseData: {},

      //  //状态的值
      z_id: "",
      //  删除的id
      s_id: "",
    };
  },
  components: {},
  // 弹框
  methods: {
    getHouse() {
      this.$axios({
        url: "/repository/list",
        method: "post",
        data: {
          page: 1,
          pageSize: 15,
        },
      })
        .then((res) => {
          this.houseData = res.data.date;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //页面一刷新
    yemian() {
      this.$axios({
        url: "/orders/list",
        method: "post",
        data: this.jiazai,
      })
        .then((res) => {
          this.tableData = res.data.date;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //状态是否关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    // 提交
    // onSubmit() {
    //   console.log("submit!");
    // },

    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.yemian();
    },

    // 查看/上面导航 未支付
    handleClick(row) {
      console.log(1, row);
    },

    //删除
    deleteForm() {
      console.log("这是删除事件");
    },
    //查询
    submitForm() {},
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert(this.formInline.user);//formInline.user就是input里面的内容
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    //    分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.jiazai.startIndex = val;
      this.yemian();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.jiazai.pageSize = val;
      this.yemian();
    },

    // 表格的单选多选
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
      this.jiazai.state = tab.index;
      console.log(tab.name, event);
      this.yemian();
      console.log(34567899, this.jiazai.state);
    },

    //查询

    chaxun() {
      if (this.formInline.user == "") {
        alert("不能为空");
        return;
      } else {
        this.$axios({
          url: "/orders/findItemByName",
          method: "post",
          params: {
            buyerName: this.formInline.user,
          },
        })
          .then((res) => {
            this.tableData = [];

            for (let i = 0; i < res.data.date.length; i++) {
              this.tableData.push(res.data.date[i]);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    //详情
    xiangqing(row) {
      // console.log(row.Serial);
      // return this.xiangqing_data.push(row),
      this.$axios({
        url: `/orders/${row.id}`,
        params: {
          // id:123
        },
      })
        .then((res) => {
          this.yemian_data = [];
          this.yemian_data.push(res.data.date[0]);

          // return this.yemian_data
          // row.o_number=res.data.date.id;
          // row.data=res.data.date.orderTime;
          // row.o_status=res.data.date.orderStatus;
          // row.freight=res.data.date.freight;
          // row.Serial=res.data.date.commodityNumber;
          // row.o_status=res.data.date.buyerNumber;
          // return this.xiangqing_data.push(res.data.date)
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //编辑
    bianji(row) {
      this.bianji_data = [];
      console.log(99999, row.id);
      this.$axios({
        url: `/orders/${row.id}`,
        params: {},
      })
        .then((res) => {
          this.bianji_data = res.data.date;

          // return this.z_id=res.data.date.id;
        })
        .catch((err) => {
          console.log(err);
        });
      return (this.z_id = row.id);
      // console.log(5555,this.z_id);
    },

    // 编辑确定发送接口的代码
    b_queding() {
      if (
        this.formLabelAlign.name == "" &&
        this.formLabelAlign.region == "" &&
        this.formLabelAlign.type == ""
      ) {
        alert("不能为空");
        return;
      } else {
        this.centerDialogVisible = !this.centerDialogVisible;
        // console.log(this.formLabelAlign.name);
        // console.log(this.formLabelAlign.region);
        // console.log(this.formLabelAlign.type);

        this.$axios({
          url: "orders/updateByName",
          method: "post",
          params: {
            id: this.z_id, //点击编辑的时候拿到的
            buyerName: this.formLabelAlign.name,
            phone: this.formLabelAlign.region,
            address: this.formLabelAlign.type,
          },
        })
          .then((res) => {
            console.log("编辑确定", res);
            this.yemian();
          })
          .catch((err) => {
            console.log(err);
          });
        //编辑里面的修改
        this.formLabelAlign.name = "";
        this.formLabelAlign.region = "";
        this.formLabelAlign.type = "";
      }
    },

    //状态
    zhuangtai1(row) {
      console.log(row.id);
      this.z_id = row.id;
    },

    z_queding() {
      console.log(1, this.z_id);
      console.log(2, this.value);
      console.log(3, this.value1); //这个是选择仓库的id
      this.$axios({
        url: "/orders/updateOrderStatus",
        method: "post",
        params: {
          id: this.z_id,
          state: this.value,
        },
      })
        .then((res) => {
          console.log(66666, this.value, res);
          this.tableData.state = this.value;
          this.yemian();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //  删除
    //   w_shanchu(row){
    //     console.log(row);
    //     this.s_id=row.Serial
    //   },
    //   w_queding(){
    //     // this.$axios({
    //     //   url:'/',
    //     //   data:{
    //     //
    //     //   },
    //     // }).then((res)=>{
    //     //   console.log(res)
    //     // }).catch((err)=>{
    //     //   console.log(err)
    //     // })
    //     // alert(1);
    //     console.log(this.s_id)
    //   }
  },
  //挂载后
  mounted() {
    //仓库
    this.getHouse();
    //详情
    this.yemian();
    //分页
    // this.$axios({
    //   url:'orders/list',
    //   params:this.jiazai
    // }).then((res)=>{
    //   console.log('分页',res);
    //   this.tableData=res.data.date
    // }).catch((err)=>{
    //   console.log(1,err)
    // });
  },
};
</script>