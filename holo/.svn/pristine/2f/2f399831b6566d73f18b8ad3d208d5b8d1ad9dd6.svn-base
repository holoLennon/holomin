<#--
搜索版动态的下拉框Tree
<select><option></option></select>
-->
<#macro searchselecttree
    url	  
    label=""     nameid="" help="" 
    class="easyui-combotree"  moreopt=""
    >
  
 <#if label!=""><@s.mtct ct="${label}"/>:</#if>
<select name="search_${nameid}" id="search_${nameid}" class="${class}" data-options="method:'GET',url:'${url}',cascadeCheck:false,onSelect: function(node){ if(node.id=='') queryByHql(''); else queryByHql('${nameid}='+node.id); } "  ${moreopt}> 
</select>

</#macro>
