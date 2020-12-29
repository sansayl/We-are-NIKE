<template>
  <div class="page1">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="一致性 Consistency" name="1">
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
        <div class="page-top">
          <span>一级类别</span>
          <el-select v-model="Leibie" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <br />
          <span>二级类别</span>
          <el-select v-model="Leibie2" placeholder="请选择">
            <el-option
              v-for="item in options2"
              :key="item.value2"
              :label="item.label2"
              :value="item.value2"
            >
            </el-option>
          </el-select>
          <br />
          <span style="margin-right: 50px">尺寸</span>
          <el-select v-model="chicun" placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value1"
              :label="item.label1"
              :value="item.value1"
            >
            </el-option>
          </el-select>
          <br />
          <el-row>
            <el-button type="primary">添加</el-button>
          </el-row>
        </div>
      </el-collapse-item>
    </el-collapse>

    <div class="page-bottom">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="leibie" label="商品类别" width="180">
        </el-table-column>
        <el-table-column prop="name" label="商品名称" width="180">
        </el-table-column>
        <el-table-column prop="chima" label="尺码"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="delete1" type="text" size="small"
              >删除</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="dialogFormVisible = true"
              >编辑</el-button
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

      <el-dialog title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="商品类别" :label-width="formLabelWidth">
            <el-input v-model="form.leibie" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="商品名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="尺码" :label-width="formLabelWidth">
            <el-input v-model="form.size" autocomplete="off"></el-input>
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
.page-top {
  background: white;
  padding: 20px;
  & > span {
    line-height: 60px;
    width: 70px;
    margin-right: 20px;
    margin-left: 20px;
  }
  .el-button {
    margin: 20px 0 10px 20px;
  }
}
.page-bottom {
  margin-top: 20px;
}
</style>
<script>
export default {
  name: "size",
  data() {
    return {
      //一级类别
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
      Leibie: "",
      //尺寸
      options1: [
        {
          value1: "选项1",
          label1: "黄金糕",
        },
        {
          value1: "选项2",
          label1: "双皮奶",
        },
        {
          value1: "选项3",
          label1: "蚵仔煎",
        },
        {
          value1: "选项4",
          label1: "龙须面",
        },
        {
          value1: "选项5",
          label1: "北京烤鸭",
        },
      ],
      chicun: "",
      //二级类别
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
      Leibie2: "",
      tableData: [
        {
          leibie: "运动鞋",
          name: "aj",
          chima: "42",
        },
      ],
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
    handleClick(row) {
      console.log(row);
    },
    //页码
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //删除
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