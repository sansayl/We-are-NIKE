<template>
  <div class="page1">
    <div class="roleSelect">
      <template>
        <el-form
          :inline="true"
          :model="formInline"
          ref="formInline"
          class="demo-form-inline"
        >
          <el-form-item label="" prop="roleNam">
            <el-input
              v-model="formInline.roleNam"
              placeholder="角色名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="" prop="roleCod">
            <el-input
              v-model="formInline.roleCod"
              placeholder="角色编码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('formInline')"
              >查询</el-button
            >
            <el-button
              type="primary"
              class="rloeAddBt"
              @click="dialogVisible = true"
              >新增</el-button
            >
            <el-button @click="resetForm('formInline')">重置</el-button>
          </el-form-item>
          <el-form-item> </el-form-item>
        </el-form>
      </template>
    </div>
    <!-- 表格 -->
    <div class="roleTable">
      <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="roleCode" label="角色编码" style="width: 30%">
          </el-table-column>

          <el-table-column prop="roleName" label="角色名称" style="width: 30%">
          </el-table-column>
          <el-table-column prop="roleUse" label="是否可用" style="width: 30%">
          </el-table-column>
          <el-table-column fixed="right" label="操作" style="width: 40%">
            <template>
              <el-button @click="dialogVisible = true" type="text" size="small"
                >编辑</el-button
              >
              <el-button @click="roleVisible = true" type="text" size="small"
                >设置权限</el-button
              >
              <el-button type="text" size="small" @click="dialogVisible = true"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 页码 -->
    <div class="rolePage">
      <div class="block">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="30"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    <!-- 新增弹窗 -->
    <el-dialog title="新增" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="roleCode">
          <el-input v-model="ruleForm.roleCode"></el-input>
        </el-form-item>

        <el-form-item label="是否可用" prop="roleUse">
          <el-radio v-model="radio" label="1">可用</el-radio>
          <el-radio v-model="radio" label="2">不可用</el-radio>
        </el-form-item>

        <el-form-item label="描述" prop="roleDesc">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="textarea">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 设置权限弹窗 -->
    <el-dialog
      title="设置权限"
      :visible.sync="roleVisible"
      width="60%"
      height="100%"
    >
      <el-tree
        :data="dataTree"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="[5]"
        :props="defaultProps"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleVisible = false">取 消</el-button>
        <el-button type="primary" @click="roleVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="stylus" scoped></style>
<script>
import { MessageBox } from "element-ui";
export default {
  name: "role",
  data() {
    return {
      // 查询数据
      formInline: {
        roleNam: "",
        roleCod: "",
      },
      //表内容数据
      tableData: [
        {
          roleName: "一般店员",
          roleCode: "c0001",
          roleUse:"可用"
        },
        {
          roleName: "一般店员",
          roleCode: "c0001",
          roleUse:"可用"
        },
      ],
      // 新增页弹窗
      dialogVisible: false,
      // 新增数据
      ruleForm: {
        roleName: "",
        roleCode: "",
      },
      // 新增是否可用
       radio: '1',
      //  新增输入框
      textarea: '',
      //新增输入验证
      rules: {
        roleName: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 5,
            max: 40,
            message: "长度在 5 到 40 个字符",
            trigger: "blur",
          },
        ],
        roleCode: [
          { required: true, message: "请输入角色编码", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      //页码
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      //权限页弹窗
      roleVisible: false,
      // 权限树数据
      dataTree: [
        {
          id: 1,
          label: "商品管理",
          children: [
            {
              id: 4,
              label: "分类管理",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
            {
              id: 5,
              label: "尺寸管理",
            },
          ],
        },
        {
          id: 2,
          label: "订单管理",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "发货管理",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
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

    // 查询按钮
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
    // 重置按钮
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  },
};
</script>


<style lang="less" scoped>
.breads {
  width: 100%;
  height: 80px;
  background: white;
  line-height: 40px;
  text-align: center;
}
.el-tabs__header {
  margin: 0 !important;
}
.roleSelect {
  width: 100%;
  height: 60px;
  //background: teal;
  padding-top: 30px;
  border-top: gray;
}
//搜索
.el-form-item {
  margin-bottom: 0 !important;
}
.el-form {
  padding-left: 20px;
}
//新增按钮样式
.el-button {
  border: none;
}
.rloeAddBt {
  background: #67c23a;
}
// 表格样式
.roleTable {
  padding: 20px;
}
// 页码样式
.rolePage {
  padding: 20px;
}
// 新增页面
.el-form-item {
  margin-bottom: 20px !important;
}
</style>