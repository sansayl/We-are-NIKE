<template>
  <div class="page1">
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
            <el-button type="primary" @click="submitForm('formInline')"
              >查询</el-button
            >
            <el-button @click="resetForm('formInline')">重置</el-button>
            <!-- 删除事件自己写 -->
            <el-button @click="deleteForm('formInline')" class="deleBt"
              >删除</el-button
            >
          </el-form-item>
          <el-form-item> </el-form-item>
        </el-form>
      </template>
    </div>
    <!--table表格-->
    <div class="liebiao">
      <template>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="未支付" name="first">
           <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column fixed prop="Serial" label="商品编号" width="120">
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="150">
          </el-table-column>
          <el-table-column prop="number" label="商品数量" width="150">
          </el-table-column>
          <el-table-column prop="price" label="商品价格" width="150">
          </el-table-column>
          <el-table-column prop="b_name" label="买家名称" width="150">
          </el-table-column>
          <el-table-column prop="o_status" label="订单状态" width="100">
          </el-table-column>
          <el-table-column prop="data" label="下单时间" width="150">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200"
            header-align="center"
          >
            <template class="caozuo">
              <el-button class="orderDetailBt"
                @click="dialogTableVisible = true"
                type="text"
                size="small"
                >详情</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="centerDialogVisible = true"
                >编辑</el-button
              >
              <el-button type="text" size="small" @click="zhuangtai = true"
                >状态</el-button
              >
              <template>
                <el-popconfirm title="确定删除吗？" class="tabDelBt">
                  <el-button type="text" size="small" slot="reference">删除</el-button>
                </el-popconfirm>
              </template>
            </template>
          </el-table-column>
        </el-table>
          </template>
        </el-tab-pane>
        <el-tab-pane label="已支付" name="second">
           <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column fixed prop="Serial" label="商品编号" width="120">
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="150">
          </el-table-column>
          <el-table-column prop="number" label="商品数量" width="150">
          </el-table-column>
          <el-table-column prop="price" label="商品价格" width="150">
          </el-table-column>
          <el-table-column prop="b_name" label="买家名称" width="150">
          </el-table-column>
          <el-table-column prop="o_status" label="订单状态" width="100">
          </el-table-column>
          <el-table-column prop="data" label="下单时间" width="150">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200"
            header-align="center"
          >
            <template class="caozuo">
              <el-button class="orderDetailBt"
                @click="dialogTableVisible = true"
                type="text"
                size="small"
                >详情</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="centerDialogVisible = true"
                >编辑</el-button
              >
              <el-button type="text" size="small" @click="zhuangtai = true"
                >状态</el-button
              >
              <template>
                <el-popconfirm title="确定删除吗？" class="tabDelBt">
                  <el-button type="text" size="small" slot="reference">删除</el-button>
                </el-popconfirm>
              </template>
            </template>
          </el-table-column>
        </el-table>
      </template>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="third">
           <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column fixed prop="Serial" label="商品编号" width="120">
          </el-table-column>
          <el-table-column prop="name" label="商品名称" width="150">
          </el-table-column>
          <el-table-column prop="number" label="商品数量" width="150">
          </el-table-column>
          <el-table-column prop="price" label="商品价格" width="150">
          </el-table-column>
          <el-table-column prop="b_name" label="买家名称" width="150">
          </el-table-column>
          <el-table-column prop="o_status" label="订单状态" width="100">
          </el-table-column>
          <el-table-column prop="data" label="下单时间" width="150">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="200"
            header-align="center"
          >
            <template class="caozuo">
              <el-button class="orderDetailBt"
                @click="dialogTableVisible = true"
                type="text"
                size="small"
                >详情</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="centerDialogVisible = true"
                >编辑</el-button
              >
              <el-button type="text" size="small" @click="zhuangtai = true"
                >状态</el-button
              >
              <template>
                <el-popconfirm title="确定删除吗？" class="tabDelBt">
                  <el-button type="text" size="small" slot="reference">删除</el-button>
                </el-popconfirm>
              </template>
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
        :current-page="currentPage4"
        :page-sizes="[5, 10, 15]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="10"
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
        <el-table :data="tableData">
          <el-table-column
            property="o_number"
            label="订单编号"
            width="100"
          ></el-table-column>
          <el-table-column
            property="name"
            label="商品名称"
            width="100"
          ></el-table-column>
          <el-table-column
            property="number"
            label="商品数量"
            width="100"
          ></el-table-column>
          <el-table-column
            property="price"
            label="商品价格"
            width="100"
          ></el-table-column>
          <el-table-column
            property="c_type"
            label="商品类型"
            width="150"
          ></el-table-column>
          <el-table-column
            property="freight"
            label="运费"
            width="50"
          ></el-table-column>
          <el-table-column
            property="b_name"
            label="买家名称"
            width="150"
          ></el-table-column>
          <el-table-column
            property="phone"
            label="电话号码"
            width="100"
          ></el-table-column>
          <el-table-column
            property="s_Address"
            label="发货地址"
            width="150"
          ></el-table-column>
          <el-table-column
            property="r_Address"
            label="收获地址"
            width="150"
          ></el-table-column>
          <el-table-column
            property="data"
            label="下单时间"
            width="150"
          ></el-table-column>
          <el-table-column
            property="o_status"
            label="订单状态"
          ></el-table-column>
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
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="c_type" label="商品类别" width="220">
                </el-table-column>
                <el-table-column prop="name" label="商品名称" width="240">
                </el-table-column>
                <el-table-column prop="number" label="商品数量" width="120">
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
          <el-button type="primary" @click="centerDialogVisible = false"
            >确 定</el-button
          >
          <!--这个确认按钮要重写-->
        </span>
      </el-dialog>
    </div>
    <!--状态-->
    <div>
      <el-dialog
        title="状态"
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
                v-for="item in options1"
                :key="item.value1"
                :label="item.label"
                :value="item.value1"
              >
              </el-option>
            </el-select>
          </div>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="zhuangtai = false">取 消</el-button>
          <el-button type="primary" @click="zhuangtai = false">确 定</el-button>
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
  color:white
}
// 详情按钮
.orderDetailBt{
  color:#67C23A
}
// 删除按钮
.tabDelBt{
  margin-left:5px ;

}
.tabDelBt .el-button{
  color:#f56c6c !important ;
}
// tab选项框
.el-tabs__nav{
  background: white !important;
}
// 按钮字体
.el-button{
  font-size: 14px;
}
</style>

<script>
export default {
  name: "order",
  data() {
    return {
      //  详情页
      tableData: [
        {
          Serial: "商品编号",
          name: "商品名称",
          number: "商品数量",
          price: "商品价格",
          b_name: "买家名称",
          o_status: "订单状态",
          data: "下单时间",
          o_number: "订单编号",
          c_type: "商品类型",
          freight: "运费",
          phone: "电话号码",
          s_Address: "发货地址",
          r_Address: "收货地址",
        },
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      xin: false,

      //    编辑
      centerDialogVisible: false,
      labelPosition: "right",
      formLabelAlign: {
        name: "11",
        region: "11",
        type: "11",
      },
      //    状态
      zhuangtai: false,
      options: [
        {
          value: "选项1",
          label: "未支付",
        },
        {
          value: "选项2",
          label: "已支付",
        },
        {
          value: "选项3",
          label: "代发货",
        },
      ],
      value: "",
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
      //    删除
      add() {
        alert(1);
      },

      //    分页
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      // tab选项卡
       activeName: 'first'
    };
  },
  components: {},
  // 弹框
  methods: {
    bianji() {},
    //状态
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    // 提交
    onSubmit() {
      console.log("submit!");
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 查看
    handleClick(row) {
      console.log(row);
    },
    //删除
    deleteForm() {
      console.log("这是删除事件");
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
    //    分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
        console.log(tab, event);
      }
  },
};
</script>