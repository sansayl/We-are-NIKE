<template>
  <div class="page1">
    <div>
        <!--<el-input-->
                <!--placeholder="请输入内容"-->
                <!--v-model="input"-->
                <!--clearable-->
                <!--class="sousuo">-->
        <!--</el-input>-->
        <!--<span>-->
            <!--<el-button type="primary" size="small">查找</el-button>-->
        <!--</span>-->

        <div class="staffSelect">
            <template>
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="">
                        <el-input
                                v-model="formInline.user"
                                placeholder="商品编号"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="">
                        <!--<el-select v-model="formInline.role" placeholder="订单编号">-->
                        <!--</el-select>-->
                        <el-input
                                v-model="formInline.role"
                                placeholder="订单编号"
                        ></el-input>
                    </el-form-item>

                    <el-form-item label="">
                        <el-input
                                v-model="formInline.tel"
                                placeholder="电话号码"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">查询</el-button>
                        <el-button
                                type="primary"
                                class="staffAddBt"
                                @click="dialogVisible = true"
                        >新增</el-button>

                    </el-form-item>
                    <!--<el-form-item> </el-form-item>-->
                </el-form>
            </template>
        </div>

    </div>
    <!--table表格-->
    <div class="liebiao">
      <template>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
          <el-table-column
                  fixed
                  prop="Serial"
                  label="商品编号"
                  width="200">
          </el-table-column>
          <el-table-column
                  prop="name"
                  label="商品名称"
                  width="120">
          </el-table-column>
          <el-table-column
                  prop="number"
                  label="商品数量"
                  width="80">
          </el-table-column>
          <el-table-column
                  prop="price"
                  label="商品价格"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="b_name"
                  label="买家名称"
                  width="220">
          </el-table-column>
          <el-table-column
                  prop="o_status"
                  label="订单状态"
                  width="100">
          </el-table-column>
          <el-table-column
                  prop="data"
                  label="下单时间"
                  width="190">
          </el-table-column>
          <el-table-column
                  fixed="right"
                  label="操作"
                  width="200"
          header-align="center">
            <template slot-scope="scope" class="caozuo">
                <el-link type="primary" @click="dialogTableVisible = true">详情</el-link>
                <el-link type="primary" @click="centerDialogVisible = true">编辑</el-link>
                <el-link type="primary" @click="zhuangtai = true">状态</el-link>
                <el-link type="primary" @click="add">删除</el-link>
                <!--<el-button type="text" @click="dialogTableVisible = true">详情</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

      <!--详情-->
      <div>
        <el-dialog title="订单详情" :visible.sync="dialogTableVisible" width="94%  ">
            <el-table :data="tableData" >
                <el-table-column property="o_number" label="订单编号" width="100"></el-table-column>
                <el-table-column property="name" label="商品名称" width="100"></el-table-column>
                <el-table-column property="number" label="商品数量" width="100"></el-table-column>
                <el-table-column property="price" label="商品价格" width="100"></el-table-column>
                <el-table-column property="c_type" label="商品类型" width="150"></el-table-column>
                <el-table-column property="freight" label="运费" width="50"></el-table-column>
                <el-table-column property="b_name" label="买家名称" width="150"></el-table-column>
                <el-table-column property="phone" label="电话号码" width="100"></el-table-column>
                <el-table-column property="s_Address" label="发货地址" width="150"></el-table-column>
                <el-table-column property="r_Address" label="收获地址" width="150"></el-table-column>
                <el-table-column property="data" label="下单时间" width="150"></el-table-column>
                <el-table-column property="o_status" label="订单状态"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
      <!--编辑-->
      <div>
          <el-dialog
                  title="编辑订单"
                  :visible.sync="centerDialogVisible"
                  width="50%"
                  center>
              <span>
                  <!--只读-->
                  <div>
                      <template>
                        <el-table
                                :data="tableData"
                                style="width: 100%">
                          <el-table-column
                                  prop="c_type"
                                  label="商品类别"
                                  width="220">
                          </el-table-column>
                          <el-table-column
                                  prop="name"
                                  label="商品名称"
                                  width="240">
                          </el-table-column>
                          <el-table-column
                                  prop="number"
                                  label="商品数量"
                                  width="120">
                          </el-table-column>
                          <el-table-column
                                    prop="price"
                                    label="商品价格"
                                    width="120">
                          </el-table-column>
                        </el-table>
                      </template>
                </div>
              </span>
        <!--可编辑-->
            <div>
              <div style="margin: 20px;"></div>
              <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
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
                    <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
                  <!--这个确认按钮要重写-->
              </span>
          </el-dialog>
      </div>
      <!--状态-->
      <div>
          <!--<el-button type="text" @click="zhuangtai = true">点击打开 Dialog</el-button>-->

          <el-dialog
                  title="提示"
                  :visible.sync="zhuangtai"
                  width="40%"
                  :before-close="handleClose">
              <span class="clearfix">
                  <div class="xuanze-1 ">
                      <el-select v-model="value" placeholder="状态">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                      </el-select>
                  </div>
                  <div class="xuanze-2">
                      <el-select v-model="value1" placeholder="仓库">
                        <el-option
                                v-for="item in options1"
                                :key="item.value1"
                                :label="item.label"
                                :value="item.value1">
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
      <!--新增-->
      <div class="xin-ye" v-show="xin">
          <XinZ></XinZ>
      </div>
    <!--分页-->
      <div class="block" >
          <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage4"
                  :page-sizes="[100, 200, 300, 400]"
                  :page-size="100"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="400">
          </el-pagination>
      </div>
  </div>
</template>
<style lang="less" scoped>
    .el-button--default {
      margin-top: 40px;
      width: 60px;
      height:34px;
      padding:0;
    }
    .xinz{
        margin-top: 30px;
    }
    .xinz button{
        width: 60px;
        height: 34px;
        padding: 0;
    }
    .fenye{
        margin-top: 30px;
    }
    .el-button--text{
        border: 1px solid #738dff;
        background: #738dff;
        color:white;
        width: 46px;
        height: 40px;
    }
    .caozuo .el-button--text{
        width: 60px;
        height: 34px;
    }
    .el-link{
        margin-left: 10px;
    }
    .el-link:first-child{
        margin-left: 10px;
    }
    .el-link{
        font-size:16px
    }
    .liebiao{
        margin-top: 1%;
    }
    /*状态*/
    .el-message-box__message>p{
        color: #c8c8c8;
    }
    .xuanze-1  {
        float:left;
        width: 220px;
        margin-left: 60px;
        margin-right:20px;
    }
    .xuanze-2{
        margin-left: 30px;
    }
    .clearfix{
        clear: both;
    }

    /*搜索*/
    .sousuo{
        width: 200px;
        /*height: 30px;*/
    }
    .staffSelect {
    width: 100%;
    height: 60px;
    //background: teal;
    padding-top: 20px;
    border-top: gray;
    }
    //搜索
    .el-form-item__content{
        /*margin-top:-30px;*/
    }
    .el-form-item {
        margin-bottom: 0 !important;
    }
    .el-form {
        padding-left: 0;
    }
    //新增按钮样式
    .el-button {
        border: none;
    }
    .staffAddBt {
        background: #67c23a;
    }
    /*分页*/
    .block{
        margin-top: 30px;
    }

</style>

<script>
import XinZ from '@/views/XinZ.vue'

export default {
  name:'order',
  data() {
    return {
    //  详情页
      tableData: [{
          Serial: '商品编号',
          name: '商品名称',
          number: '商品数量',
          price: '商品价格',
          b_name: '买家名称',
          o_status: '订单状态',
          data:'下单时间',
          o_number:'订单编号',
          c_type:'商品类型',
          freight:'运费',
          phone:'电话号码',
          s_Address:'发货地址',
          r_Address:'收货地址'
      }, ],
        dialogTableVisible: false,
        dialogFormVisible: false,
        xin:false,
        //新增
        // dialogVisible: false,
        // centerDialogVisible: false,
        // labelPosition: 'right',
        // formLabelAlign: {
        //     name: '',
        //     region: '',
        //     type: ''
        // }

    //    编辑
        centerDialogVisible: false,
        labelPosition: 'right',
        formLabelAlign: {
            name: '11',
            region: '11',
            type: '11'
        },
    //    状态
        zhuangtai: false,
        options: [{
            value: '选项1',
            label: '未支付'
        }, {
            value: '选项2',
            label: '已支付'
        }, {
            value: '选项3',
            label: '代发货'
        }],
        value: '',
        options1: [{
            value1: '选项1',
            label: '仓库'
        }],
        value1: '',


    //    查询框
        input: '',
        formInline: {
            user: "",
            role: "",
            tel:""
        },
    //    删除
        add(){
            alert(1)
        },

    //    分页
        currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4

    };
  },
    components:{
      XinZ
    },
    // 弹框
    methods: {
        bianji(){

        },
        //状态
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },

    //    查询
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
        //关闭新增弹窗
        // handleClose(done) {
        //   this.$confirm("确认关闭？")
        //     .then((_) => {
        //       done();
        //     })
        //     .catch((_) => {});
        // },
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
        }
    }
};
</script>