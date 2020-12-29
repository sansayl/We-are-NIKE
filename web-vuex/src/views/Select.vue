<template>
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
            >点我查询</span
          >
        </template>

        <div class="chaxun">
          <div style="margin-top: 15px; margin-left: 20px">
            <el-input
              placeholder="请输入内容"
              v-model="input3"
              class="input-with-select"
              style="width: 500px"
            >
              <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="商品名称" value="1"></el-option>
                <el-option label="商品类别" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <br />
          <span>价格区间查询</span>
          <br />
          <el-input
            v-model="inputJiage"
            placeholder="请输入内容"
            style="width: 200px; margin-left: 20px"
          ></el-input>
          <span>至</span>
          <el-input
            v-model="inputJiage2"
            placeholder="请输入内容"
            style="width: 200px"
          ></el-input>
          <el-button plain>搜素</el-button>
        </div>
      </el-collapse-item>
    </el-collapse>

    <div class="Select-bottom">
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
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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

      <div class="block" style="text-align: right; margin-top: 20px">
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
      <!--弹框-->
      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="商品编码" :label-width="formLabelWidth">
            <el-input v-model="form.bianma" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" :label-width="formLabelWidth">
            <el-input v-model="form.jiage" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品库存" :label-width="formLabelWidth">
            <el-input v-model="form.kucun" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品销量" :label-width="formLabelWidth">
            <el-input v-model="form.xiaoliang" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品描述" :label-width="formLabelWidth">
            <el-input v-model="form.miaoshu" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品图片" :label-width="formLabelWidth">
            <el-input v-model="form.img" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="创建日期" :label-width="formLabelWidth">
            <el-input v-model="form.data" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品状态" :label-width="formLabelWidth">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
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
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.chaxun {
  background: white;
  padding: 20px;
  margin-bottom: 20px;
  & > span {
    line-height: 40px;
    margin: 0 20px;
  }
}
.Select-bottom {
  margin-top: 20px;
}
</style>
<script>
export default {
  name: "select",
  data() {
    return {
      input3: "",
      select: "",

      //价格区间
      inputJiage: "",
      inputJiage2: "",
      //表格
      tableData: [
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
      //页码
      currentPage4: 4,
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
      //状态
      options: [
        {
          label: "已上架",
          value: "选项1",
        },
        {
          label: "已下架",
          value: "选项2",
        },
      ],
      value: "",

      //折叠面板
      activeNames: ["1"],
    };
  },
  methods: {
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