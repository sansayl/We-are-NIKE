<template>
  <div class="page1">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/about/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>员工管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 查询 -->
    <div class="roleSelect">
      <template>
        <el-form
          :inline="true"
          :model="selectData"
          ref="selectData"
          class="demo-form-inline"
        >
          <el-form-item label="" prop="rolename">
            <el-input
              v-model="selectData.rolename"
              placeholder="角色名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="" prop="rolenumber">
            <el-input
              v-model="selectData.rolenumber"
              placeholder="角色编码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="roleSelect">查询</el-button>
            <el-button
              type="primary"
              class="rloeAddBt"
              @click="addVisible = true"
              >新增</el-button
            >
            <el-button @click="resetSelect('selectData')">重置</el-button>
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
          @row-click="getDataClick"
          border
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="rolenumber"
            label="角色编码"
            style="width: 30%"
          >
          </el-table-column>

          <el-table-column prop="rolename" label="角色名称" style="width: 30%">
          </el-table-column>
          <el-table-column prop="isuse" label="是否可用" style="width: 30%">
            <template slot-scope="scope">
              <span v-if="scope.row.isuse == 1">可用</span>
              <span v-if="scope.row.isuse == 2">不可用</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" style="width: 40%">
            <template>
              <el-button @click="editVisible = true" type="text" size="small"
                >编辑</el-button
              >
              <el-button @click="setRole()" type="text" size="small"
                >设置权限</el-button
              >
              <el-button
                type="text"
                size="small"
                @click="roleDele"
                class="tabDelBt"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!-- 页码 -->
    <!-- <div class="rolePage">
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
    </div> -->
    <!-- 新增弹窗 -->
    <el-dialog title="新增" :visible.sync="addVisible" width="30%">
      <el-form
        :model="addRoleData"
        :rules="addrule"
        ref="addRoleData"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="addRoleData.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="rolenumber">
          <el-input v-model="addRoleData.rolenumber"></el-input>
        </el-form-item>

        <el-form-item label="是否可用" prop="isuse">
          <el-radio v-model="addRoleData.isuse" label="1">可用</el-radio>
          <el-radio v-model="addRoleData.isuse" label="2">不可用</el-radio>
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="addRoleData.description"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addData('addRoleData')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form
        :model="thisRowData"
        :rules="addrule"
        ref="addRoleData"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="rolename">
          <el-input v-model="thisRowData.rolename"></el-input>
        </el-form-item>
        <el-form-item label="角色编码" prop="rolenumber">
          <el-input v-model="thisRowData.rolenumber"></el-input>
        </el-form-item>

        <el-form-item label="是否可用" prop="isuse">
          <el-radio v-model="thisRowData.isuse" label="1">可用</el-radio>
          <el-radio v-model="thisRowData.isuse" label="2">不可用</el-radio>
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-model="thisRowData.description"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoleData('addRoleData')"
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
        ref="tree"
        :props="defaultProps"
        :default-checked-keys="choosedatatree"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleVisible = false">取 消</el-button>
        <el-button type="primary" @click="getCheckedNodes">确 定</el-button>
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
      radio: "2",
      //查询数据
      selectData: {},
      // 新增数据
      addRoleData: {
        rolename: "",
        rolenumber: "",
        description: "",
        isuse: "",
        id: "",
      },
      //新增输入验证
      addrule: {
        rolename: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        rolenumber: [
          { required: true, message: "请输入角色编码", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 7 个字符", trigger: "blur" },
        ],
      },
      //表内容数据
      tableData: [
        {
          roleName: "",
          roleCode: "",
          roleUse: "",
        },
      ],
      //当前点击的数据
      thisRowData: {
        rolename: "",
        rolenumber: "",
        description: "",
        isuse: "1",
        id: 0,
      },

      // 提交权限的数组
      pushrole: [],
      // 新增页弹窗
      addVisible: false,
      // 编辑页弹窗
      editVisible: false,
      //权限页弹窗
      roleVisible: false,
      // 新增是否可用
      radio: "1",
      //  新增输入框
      textarea: "",
      //页码
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      // 权限树数据
      newdataTree: [],
      dataTree: [],
      //被选中的权限树节点数组
      choosedatatree: [],
      defaultProps: {
        children: "children",
        label: "powername",
      },
    };
  },
  // 组件加载请求列表接口
  mounted() {
    this.selectRoleAll(); // 获取请求列表
    this.pushRole(); //获取所有权限菜单
  },
  methods: {
    // 新增
    addData(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            url: "/role/add",
            method: "post",
            data: this.addRoleData,
          })
            .then((res) => {
              //console.log(res);
              alert("新增成功");
              this.addVisible = false;
            })
            .catch((err) => {
              alert(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 数据列表
    selectRoleAll() {
      this.$axios({
        url: "/role/all",
        method: "get",
      })
        .then((res) => {
          console.log(res,'所有角色数据');
          this.tableData = res.data.date; //获取表格数据
          this.tableTotal = Number(res.count); //获取列表数据总数
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击获取一行数据
    getDataClick(val) {
      // val.isuse = val.isuse.toString();
      this.thisRowData = val;
      console.log(val, "当前行");
    },
    //编辑
    editRoleData() {
      this.$axios({
        url: "/role/update",
        method: "post",
        data: this.thisRowData,
      })
        .then((res) => {
          alert("修改成功"), (this.editVisible = false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 页面进入后直接调用接口查询所有权限渲染权限页
    pushRole() {
      this.$axios({
        url: "/power/find",
        method: "get",
      })
        .then((res) => {
          //console.log(res, "权限树");
          if (res.data) {
            this.dataTree.splice(0, this.dataTree.length);
            for (let key in res.data.date) {
              let menuData = {
                id: key,
                powername: key,
                powerurl: "",
                parentId: "",
                children: [],
              };
              res.data.date[key].forEach((item) => {
                menuData.children.push(item);
              });
              this.dataTree.push(menuData);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 设置角色
    setRole() {
      this.choosedatatree =[],
      this.roleVisible = true;
      this.$axios({
        url: "/role/powers",
        method: "get",
        params: {
          id: this.thisRowData.id,
        },
      })
        .then((res) => {
         
       
          this.choosedatatree = res.data.date;
          console.log(this.thisRowData.id, "当前行的id");
          console.log(res.data.date,'返回的值')
          console.log(this.choosedatatree, "当前角色拥有的权限");
          console.log(this.choosedatatree, "遍历后的数组");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getCheckedNodes() {
      let clickroldata = this.$refs.tree.getCheckedNodes();
      console.log(clickroldata, "完整");
      this.pushrole = [];
      for (let i = 0; i < clickroldata.length; i++) {
        this.pushrole.push(clickroldata[i].id);
        this.pushrole = this.pushrole.filter(
          (item) => typeof item !== "string"
        );
      }
      console.log(this.pushrole, "数组");
      this.$axios({
        url: "/power/setpwr",
        method: "post",
        data: {
          id: this.thisRowData.id,
          powerids: this.pushrole,
        },
      })
        .then((res) => {
          alert("权限设置成功"), (this.roleVisible = false);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //删除
    roleDele() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$axios({
            url: "/role/delete",
            method: "get",
            params: {
              id: this.thisRowData.id,
            },
          })
            .then((res) => {
              this.selectRoleAll();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 查询按钮
    roleSelect() {
      this.$axios({
        url: "/role/findrole",
        method: "post",
        data: {
          rolename: this.selectData.rolename,
          rolenumber: this.selectData.rolenumber,
        },
      })
        .then((res) => {
          this.tableData = [];
          for (let i = 0; i < res.data.date.length; i++) {
            this.tableData.push(res.data.date[i]);
          }
          console.log(this.tableData);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 重置按钮
    resetSelect(formName) {
      this.$refs[formName].resetFields();
       this.selectRoleAll();
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
.el-breadcrumb {
  padding: 20px;
}
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

// 删除按钮
.tabDelBt {
  color: #f56c6c !important ;
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