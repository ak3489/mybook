function autop($pee, $br) {
  var $pre_tags = {};
  var trim = function (str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
  }
  if (trim($pee) === '') {
    return '';
  }

  $pee = $pee + "\n"; // just to make things a little easier, pad the end

  if ($pee.indexOf('<pre') !== -1) {
    var $pee_parts = $pee.split('</pre>');
    var $last_pee = $pee_parts.pop();
    $pee = '';
    var $start, $name;
    for (var i = 0, len = $pee_parts.length; i < len; i++) {
      $start = $pee_parts[i].indexOf('<pre');

      // Malformed html?
      if ($start === -1) {
        $pee += $pee_parts[i];
        continue;
      }

      $name = "<pre wp-pre-tag-" + i + "></pre>";
      $pre_tags[$name] = $pee_parts[i].substr($start) + '</pre>';

      $pee += $pee_parts[i].substr(0, $start) + $name;
    }

    $pee += $last_pee;
  }

  $pee = $pee.replace(new RegExp('<br \/>\\s*<br \/>', 'gi'), "\n\n");
  var $allblocks = '(?:table|thead|tfoot|caption|col|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|li|pre|form|map|area|blockquote|address|math|style|p|h[1-6]|hr|fieldset|legend|section|article|aside|hgroup|header|footer|nav|figure|details|menu|summary)';
  $pee = $pee.replace(new RegExp('(<' + $allblocks + '[^>]*>)', 'gi'), "\n$1");
  $pee = $pee.replace(new RegExp('(<\/' + $allblocks + '>)', 'gi'), "$1\n\n");
  $pee = $pee.replace(/(\r\n|\r)/gi, "\n"); // cross-platform newlines

  if ($pee.indexOf('<option') !== -1) {
    // no P/BR around option
    $pee = $pee.replace(/\s*<option/gi, '<option');
    $pee = $pee.replace(/<\/option>\s*/gi, '</option>');
  }

  if ($pee.indexOf('</object>') !== -1) {
    // no P/BR around param and embed
    $pee = $pee.replace(/(<object[^>]*>)\s*/gi, '$1');
    $pee = $pee.replace(/\s*<\/object>/, '</object>');
    $pee = $pee.replace(/\s*(<\/?(?:param|embed)[^>]*>)\s*/gi, '$1');
  }

  if ($pee.indexOf('<source') !== -1 || $pee.indexOf('<track') !== -1) {
    // no P/BR around source and track
    $pee = $pee.replace(/([<\[](?:audio|video)[^>\]]*[>\]])\s*/gi, '$1');
    $pee = $pee.replace(/\s*([<\[]\/(?:audio|video)[>\]])/gi, '$1');
    $pee = $pee.replace(/\s*(<(?:source|track)[^>]*>)\s*/gi, '$1');
  }

  $pee = $pee.replace(/\n\n+/, "\n\n"); // take care of duplicates
  // make paragraphs, including one at the end
  $pees = $pee.split(/\n\s*\n/).filter(function (item) {
    return (item != false);
  });
  $pee = '';

  for (var i = 0, len = $pees.length; i < len; i++) {
    $pee += '<p>' + trim($pees[i], "\n") + "</p>\n";
  }

  $pee = $pee.replace(/<p>\s*<\/p>/gi, ''); // under certain strange conditions it could create a P of entirely whitespace
  $pee = $pee.replace(/<p>([^<]+)<\/(div|address|form)>/gi, "<p>$1</p></$2>");
  $pee = $pee.replace(new RegExp('<p>\s*(<\/?' + $allblocks + '[^>]*>)\s*<\/p>', 'gi'), "$1"); // don't pee all over a tag
  $pee = $pee.replace(/<p>(<li.+?)<\/p>/gi, "$1"); // problem with nested lists
  $pee = $pee.replace(/<p><blockquote([^>]*)>/gi, "<blockquote$1><p>");
  $pee = $pee.replace('</blockquote></p>', '</p></blockquote>');
  $pee = $pee.replace(new RegExp('<p>\s*(<\/?' + $allblocks + '[^>]*>)', 'gi'), "$1");
  $pee = $pee.replace(new RegExp('(<\/?' + $allblocks + '[^>]*>)\s*</p>', 'gi'), "$1");

  if ($br) {
    //$pee = preg_replace_callback('/<(script|style).*?<\/\\1>/s', '_autop_newline_preservation_helper', $pee);
    $pee = $pee.replace(/<br \/>\s*\n/, "<br />\n"); // optionally make line breaks
    $pee = $pee.replace('<WPPreserveNewline />', "\n");
  }

  $pee = $pee.replace(new RegExp('(</?' + $allblocks + '[^>]*>)\s*<br />', 'gi'), "$1");
  $pee = $pee.replace(/<br \/>(\s*<\/?(?:p|li|div|dl|dd|dt|th|pre|td|ul|ol)[^>]*>)/gi, '$1');
  $pee = $pee.replace(/\n<\/p>$/, '</p>');
  if (!$pre_tags.length) {
    for (var i in $pre_tags) {
      if ($pre_tags.hasOwnProperty(i)) {
        $pee = $pee.replace(i, $pre_tags[i]);
      }
    }
  }
  return $pee;
}
module.exports = {
  autop
}
