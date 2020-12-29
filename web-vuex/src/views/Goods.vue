r<template>
  <!-- 商品管理页 -->
  <div class="page1">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title">
          <span
            style="
              float: left;
              font-weight: bold;
              font-size: 14px;
              color: #2c8df4;
              margin-left: 40px;
            "
            >添加</span
          >
        </template>
        <div class="tianjia">
          <p>基本信息</p>
          <span>商品分类</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <br />
          <span>第二分类</span>
          <el-select v-model="value2" placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.value2"
              :label="item.label2"
              :value="item.value2"
            >
            </el-option>
          </el-select>
          <br />
          <span>商品名称</span>
          <el-input
            placeholder="请输入内容"
            v-model="inputName"
            clearable
            style="width: 600px"
          >
          </el-input>
          <br />
          <span>分享描述</span>
          <el-input
            placeholder="请输入内容"
            v-model="inputDes"
            clearable
            style="width: 600px"
          >
          </el-input>
          <br />
          <span>产品卖点</span>
          <el-input
            placeholder="请输入内容"
            v-model="inputMaidian"
            clearable
            style="width: 600px"
          >
          </el-input>
          <br />
          <span>产品图片</span>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>

          <div class="shangjia">
            <el-radio v-model="radio1" label="1" border>立即上架</el-radio>
          </div>

          <div class="shangjia">
            <el-radio v-model="radio2" label="1" border>定时上架</el-radio>

            <div class="block">
              <el-date-picker
                v-model="msg"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </div>
          </div>

          <el-row>
            <el-button type="primary">确定保存</el-button>
            <el-button plain>保存到草稿</el-button>
            <el-button plain>重置表单</el-button>
          </el-row>
        </div>
      </el-collapse-item>
    </el-collapse>

    <div class="guanli">
      <p>商品管理</p>

      <div style="margin-top: 15px" class="Sousuo">
        <el-input
          placeholder="请输入商品编码"
          v-model="chaxunBianma"
          class="input-with-select"
        >
        </el-input>
        <el-input
          placeholder="请输入商品名称"
          v-model="chaxunName"
          class="input-with-select"
        >
        </el-input>
        <el-input
          style="margin-right: 0"
          placeholder="请输入商品价格区间"
          v-model="chaxunJiage1"
          class="input-with-select"
        >
        </el-input
        ><span>至</span>
        <el-input
          placeholder="请输入商品价格区间"
          v-model="chaxunJiage2"
          class="input-with-select"
        >
        </el-input>

        <el-button type="primary">查询</el-button>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="已上架" name="first">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="bianma" label="商品编码" width="">
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="120">
            </el-table-column>
            <el-table-column prop="jiage" label="价格"> </el-table-column>

            <el-table-column prop="kucun" label="库存"> </el-table-column>
            <el-table-column prop="xiaoliang" label="销量"> </el-table-column>
            <el-table-column prop="miaoshu" label="描述" width="300px">
            </el-table-column>
            <el-table-column prop="img" label="图片"> </el-table-column>
            <el-table-column prop="data" label="创建日期"> </el-table-column>
            <el-table-column prop="zhuangtai" label="状态">
              <template>
                <el-select v-model="zhuangtai" placeholder="请选择">
                  <el-option
                    v-for="item in options5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="220px">
              <template slot-scope="scope">
                <el-button size="mini" @click="">下架</el-button>
                <el-button size="mini" @click="dialogFormVisible = true"
                  >编辑</el-button
                >
                <el-button size="mini" type="danger" @click="delete1"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="block" style="text-align: right">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已下架" name="second">
          <el-table :data="tableData1" border style="width: 100%">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="bianma" label="商品编码" width="">
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="120">
            </el-table-column>
            <el-table-column prop="jiage" label="价格"> </el-table-column>

            <el-table-column prop="kucun" label="库存"> </el-table-column>
            <el-table-column prop="xiaoliang" label="销量"> </el-table-column>
            <el-table-column prop="miaoshu" label="描述" width="300px">
            </el-table-column>
            <el-table-column prop="img" label="图片"> </el-table-column>
            <el-table-column prop="data" label="创建日期"> </el-table-column>
            <el-table-column prop="zhuangtai" label="状态">
              <template>
                <el-select v-model="zhuangtai" placeholder="请选择">
                  <el-option
                    v-for="item in options5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="220px">
              <template slot-scope="scope">
                <el-button size="mini" @click="dialogFormVisible = true"
                  >编辑</el-button
                >
                <el-button size="mini" type="danger" @click="delete1"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="block" style="text-align: right">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待发布" name="third">
          <el-table :data="tableData2" border style="width: 100%">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column prop="bianma" label="商品编码" width="">
            </el-table-column>
            <el-table-column prop="name" label="商品名称" width="120">
            </el-table-column>
            <el-table-column prop="jiage" label="价格"> </el-table-column>

            <el-table-column prop="kucun" label="库存"> </el-table-column>
            <el-table-column prop="xiaoliang" label="销量"> </el-table-column>
            <el-table-column prop="miaoshu" label="描述" width="300px">
            </el-table-column>
            <el-table-column prop="img" label="图片"> </el-table-column>
            <el-table-column prop="data" label="创建日期"> </el-table-column>
            <el-table-column prop="zhuangtai" label="状态">
              <template>
                <el-select v-model="zhuangtai" placeholder="请选择">
                  <el-option
                    v-for="item in options5"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="220px">
              <template slot-scope="scope">
                <el-button size="mini" @click="">上架</el-button>
                <el-button size="mini" @click="dialogFormVisible = true"
                  >编辑</el-button
                >
                <el-button size="mini" type="danger" @click="delete1"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div class="block" style="text-align: right">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>

      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="商品编码" :label-width="formLabelWidth">
            <el-input
              v-model="form.bianma"
              autocomplete="off"
              style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="价格" :label-width="formLabelWidth">
            <el-input v-model="form.jiage" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="库存" :label-width="formLabelWidth">
            <el-input v-model="form.kucun" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="销量" :label-width="formLabelWidth">
            <el-input v-model="form.xiaoliang" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="图片" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="创建日期" :label-width="formLabelWidth">
            <el-input v-model="form.data" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="描述" :label-width="formLabelWidth">
            <el-input v-model="form.miaoshu" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-select v-model="zhuangtai" placeholder="请选择">
              <el-option
                v-for="item in options5"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<style lang="less" scoped>
.page1 {
  padding: 20px;
}
.tianjia {
  background: white;
  padding: 20px 30px;
  & > p {
    color: #999;
    background: whitesmoke;
    line-height: 20px;
    padding: 10px;
  }
  & > span {
    line-height: 80px;
    margin: 0 40px 0 20px;
  }
  .shangjia {
    margin-top: 30px;
    .block {
      display: inline-block;
    }
  }
  .el-button {
    margin: 30px 20px 20px 0;
  }
}
.guanli {
  margin-top: 20px;
  background: white;
  padding: 20px 30px;
  & > p {
    color: #999;
    background: whitesmoke;
    line-height: 20px;
    padding: 10px;
    margin-bottom: 20px;
  }
  .Sousuo {
    margin: 20px 0;
    .el-input {
      width: 200px;
      margin-right: 30px;
    }
  }
  .el-table {
    margin-bottom: 20px;
  }
}
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
<script>
export default {
  name: "goods",
  data() {
    return {
      //商品分类
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      //第二类别
      options2: [
        {
          value2: "选项1",
          label2: "黄金糕",
        },
        {
          value2: "选项2",
          label2: "双皮奶",
        },
        {
          value2: "选项3",
          label2: "蚵仔煎",
        },
        {
          value2: "选项4",
          label2: "龙须面",
        },
        {
          value2: "选项5",
          label2: "北京烤鸭",
        },
      ],
      value2: "",
      //状态
      options5: [
        { value: "选项1", label: "已上架" },
        { value: "选项2", label: "已下架" },
      ],
      zhuangtai: "",
      //商品名称
      inputName: "",
      //商品描述
      inputDes: "",
      //产品卖点
      inputMaidian: "",
      //上传图片
      dialogImageUrl: "",
      dialogVisible: false,
      //立即上架
      radio1: "1",
      //定时上架
      radio2: "0",
      //选择日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      msg: "",

      activeName: "first",
      //表格
      tableData: [
        {
          bianma: "",
          name: "王小虎",
          jiage: "",
          kucun: "",
          xiaoliang: "",
          miaoshu: "",
          img: "",
          data: "",
          zhuangtai: "",
        },
      ],
      tableData1: [
        {
          bianma: "",
          name: "下架",
          jiage: "",
          kucun: "",
          xiaoliang: "",
          miaoshu: "",
          img: "",
          data: "",
          zhuangtai: "",
        },
      ],
      tableData2: [
        {
          bianma: "",
          name: "待发布",
          jiage: "",
          kucun: "",
          xiaoliang: "",
          miaoshu: "",
          img: "",
          data: "",
          zhuangtai: "",
        },
      ],
      //搜索内容选择
      chaxunBianma: "",
      chaxunName: "",
      chaxunJiage1: "",
      chaxunJiage2: "",
      //编辑弹框
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",

      //折叠面板
      activeNames: ["1"],
    };
  },
  methods: {
    //上传图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //页码
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    delete1() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        customClass: "del",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //多选
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
    //折叠面板
    handleChange(val) {
      console.log(val);
    },
  },
};
</script>